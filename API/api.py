from flask import Flask, jsonify, request
import string, psycopg2

app = Flask(__name__)
app.config.from_pyfile('config.py')

msg_banco: string
msg_banco = "<h1> SOMOS BANCO </h1> <p> TU GENTE, TU BANCO </p>"

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
    except Exception as error:
        print('error connecting to database', error)
    #cursor para ejecutar los query
    global db
    db = conn.cursor()

connectDatabase()

@app.route('/', methods=['GET']) #home
def home():
    return msg_banco

@app.route('/login', methods=['POST']) #Log In
def login():
    json = request.get_json(force=True)
    email = json['login']
    passw = json['password']
    sql = """   SELECT id_customer 
                FROM tblcustomer as c
                WHERE (c.customer_email, c.password) = (%(email)s,%(passw)s) """
    try:
        db.execute(sql, {'email':email, 'passw':passw})
        result = db.fetchone()
        if(result):
            #usuario y password coinciden
            response = {"user_id":result[0]}
            return jsonify(response)
        else: 
            #chequeamos si ese usuario existe
            sql = """ SELECT id_customer
                    FROM tblcustomer as c
                    WHERE (c.customer_email) = (%(email)s) """
            db.execute(sql, {'email':email})
            result = db.fetchone()
            if(result):
                #el usuario existe, pero la contrasenha no es correcta. se le notifica al usuario.
                return jsonify({'message':'Wrong Password'}), 403
            else:
                #el usuario no existe, se deberia notificar al usuario para que se registre
                return jsonify({'message':'Wrong username'}), 403
    except Exception as e:
        print("error at /login:")
        print (e)
        connectDatabase()


@app.route('/registrar', methods=['POST']) #registrar usuario
def register():
    json = request.get_json(force=True)
    email = json['email']
    passw = json['password']
    name = json['name']
    phone = json['phone']
    sql = """INSERT INTO  tblcustomer (id_customer,name_customer,customer_phone,customer_email,password)
             VALUES (DEFAULT, %(name)s,%(phone)s,%(email)s,%(passw)s)             
    """
    try:
        db.execute(sql, {'email':email, 'passw':passw, 'name':name, 'phone':phone})
        conn.commit()
        #sql = """ SELECT * FROM tblcustomer 
        #          ORDER BY id_customer DESC
        #          LIMIT 1 
        #"""
        #result = db.fetchone()
        response = {"message":"success"}
        return jsonify(response), 200

    except Exception as e:
        print("error at /registrar:")
        print (e)
        connectDatabase()


@app.route('/consultar', methods=['GET']) #Consultar Cuentas (clientes y TCred)
def consultar():
    return msg_banco

@app.route('/card/pay', methods=['POST']) #pagar tarjeta de credito
def pagar():
    return jsonify({
        'message': 'xxxxxxxxxxxx',
        'codigo operacion': 'exitoso',
        'orden': 'x-44512'
        })  

@app.route('/movimientos', methods=['GET']) #movimientos de cuentas 
def movimientos():
    return msg_banco

#faltan tambien los de uso interno de la app
if __name__ == '__main__':
    db.close()
    conn.close()
