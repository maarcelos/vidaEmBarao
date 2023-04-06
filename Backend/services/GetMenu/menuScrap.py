# imports
import sys
sys.path.append(r"C:\Python310\Lib\site-packages")
from utils import *
from dotenv import load_dotenv
from pymongo import MongoClient
import os



def MenuScrap():

    # load enviroment variables
    load_dotenv("./.env")
    url = os.environ.get("SITE_PREFEITURA")
    mongo = os.environ.get("MONGO")
    dbName = os.environ.get("DB")
    collection = os.environ.get("COLLECTION")


    # parse html
    doc =  getHtml(url)

    # extract days
    days = extractDays(doc)

    # get menu
    menu = extractMenu (url, days)

    # parse menu
    parsedMENU = parseMenu(menu)

    # connect mongo
    client = MongoClient(mongo)

    # get db 
    db = client[dbName]

    # get collection
    collection = db[collection]

    
    for doc in parsedMENU:
        # try to find a matching document in the database
        result = collection.find_one({"DATA": doc["DATA"]})
    
        # if a matching document exists, update it
        if result:
            collection.update_one({"DATA": doc["DATA"]}, {"$set": doc})
    
        # if no matching document exists, insert the new document
        else:
            collection.insert_one(doc)