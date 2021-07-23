from flask import Flask, jsonify, request
import string, psycopg2
from passlib.context import CryptContext

app = Flask(__name__)
app.config.from_pyfile('config.py')
msg_banco: string
msg_banco = "<h1> SOMOS BANCO </h1> <p> TU GENTE, TU BANCO </p>"
key = app.config.get('ENCRYPTION_KEY')

pwd_context = CryptContext(schemes=["pbkdf2_sha256"])


def connectDatabase():
    global conn
    try:
        conn = psycopg2.connect(
                host = app.config.get('DATABASE_HOST'),
                database = app.config.get('DATABASE_NAME'),
                user = app.config.get('DATABASE_USER'),
                password = app.config.get('DATABASE_PSSWD')
        )
        print('successful connection to the database!')
        global db
        db = conn.cursor()
    except Exception as error:
        print('error connecting to database', error)
    #cursor para ejecutar los query
    

connectDatabase()

@app.route('/api/v1', methods=['GET']) #home
def home():
    return msg_banco

@app.route('/api/v1/login', methods=['POST']) #Log In
def login():
    json = request.get_json(force=True)
    email = json['login']
    passw = json['password']
    #print("PASSW: "+passw)
    sql = """   SELECT id_customer, password 
                FROM tblcustomer as c
                WHERE (c.customer_email) = (%(email)s) """
    try:
        db.execute(sql, {'email':email})
        result = db.fetchone()
        print(result)
        if(result):
            #procedemos a revisar el password
            passwHash = result[1]
            if(pwd_context.verify(passw,passwHash)):
                #contrasena coincide
                response = {"user_id":result[0]}
                return jsonify(response)
            else:
                #el usuario existe, pero la contrasenha no es correcta. se le notifica al usuario.
                return jsonify({'message':'Wrong Password'}), 403
        else: 
                #el usuario no existe, se deberia notificar al usuario para que se registre
                return jsonify({'message':'Wrong Username'}), 403
    except Exception as e:
        print("error at /login:")
        print (e)
        connectDatabase()


@app.route('/api/v1/registrar', methods=['POST']) #registrar usuario
def register():
    json = request.get_json(force=True)
    email = json['email']
    passw = json['password']
    passwHash=pwd_context.hash(passw)
    #print("PASSW: "+passw)
    name = json['name']
    phone = json['phone']
    sql = """   SELECT id_customer 
                    FROM tblcustomer as c
                    WHERE (c.customer_email) = (%(email)s) """
    db.execute(sql, {'email':email})
    result = db.fetchone()
    if(result):
        #usuario existe asi que va a haber un error
        return jsonify({'message':'duplicate username'}), 403
  
    else:
        sql = """INSERT INTO  tblcustomer (id_customer,name_customer,customer_phone,customer_email,password)
                 VALUES (DEFAULT, %(name)s,%(phone)s,%(email)s,%(passw)s)             
        """
        try:
            db.execute(sql, {'email':email, 'passw':passwHash, 'name':name, 'phone':phone})
            conn.commit()
            response = {"message":"success"}
            return jsonify(response), 200
        except Exception as e:
            print("error at /registrar:")
            print (e)
            connectDatabase()


@app.route('/api/v1/consultar', methods=['GET']) #Consultar Cuentas (clientes y TCred)
def consultar():
    return jsonify(key)

@app.route('/api/v1/card/pay', methods=['POST']) #pagar tarjeta de credito
def pagar():
    return jsonify({
        'message': 'xxxxxxxxxxxx',
        'codigo operacion': 'exitoso',
        'orden': 'x-44512'
        })  

@app.route('/api/v1/movimientos', methods=['GET']) #movimientos de cuentas 
def movimientos():
    return msg_banco

#faltan tambien los de uso interno de la app
if __name__ == '__main__':
    app.run(port=3001)
    
db.close()
conn.close()
print("API Closed")
