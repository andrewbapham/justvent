from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

DB_PASSWORD = os.getenv("DB_PASSWORD")


def get_database_client() -> MongoClient:

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = f"mongodb://justventdb:{DB_PASSWORD}@docdb-2024-09-28-02-58-29.cluster-chwgmeickfoa.us-east-2.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
    # CONNECTION_STRING = "mongodb://localhost:27017/"
    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client


db = get_database_client().justventdb
db.journals.create_index([("content", "text")])
