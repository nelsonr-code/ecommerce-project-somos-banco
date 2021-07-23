import os
from dotenv import load_dotenv
BASE_DIR = os.path.join( os.path.dirname( __file__ ), '..' )
load_dotenv(os.path.join(BASE_DIR, '.env'))

DATABASE_URL = os.getenv('DATABASE_URL')
DATABASE_USER = os.getenv('DATABASE_USER')
DATABASE_PSSWD = os.getenv('DATABASE_PSSWD')
DATABASE_HOST = os.getenv('DATABASE_HOST')
DATABASE_PORT = os.getenv('DATABASE_PORT')
DATABASE_NAME = os.getenv('DATABASE_NAME')
DATABASE_URL= os.getenv('DATABASE_NAME')

