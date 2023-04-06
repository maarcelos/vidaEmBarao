# imports
import os
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from utils import *



def menuRequest():

    # load enviroment variables
    load_dotenv("./.env")
    url = os.environ.get("MENU_API")
    mongo = os.environ.get("MONGO")
    dbName = os.environ.get("DB")
    collection = os.environ.get("COLLECTION")

    # define headers
    headers = {
        "Accept": "application/json"

    }

    # A POST request to the API
    response = requests.post(url, timeout=10, headers=headers)
    response.raise_for_status()
    response_json = response.json()

    # connect mongo
    client = MongoClient(mongo)

    # get db 
    db = client[dbName]

    # get collection
    collection = db[collection]

    # parse to mongo
    parsedMENU = mongoShape(response_json["CARDAPIO"])


    for doc in parsedMENU:
        # try to find a matching document in the database
        result = collection.find_one({"DATA": doc["DATA"]})
    
        # if a matching document exists, update it
        if result:
            collection.update_one({"DATA": doc["DATA"]}, {"$set": doc})
    
        # if no matching document exists, insert the new document
        else:
            collection.insert_one(doc)