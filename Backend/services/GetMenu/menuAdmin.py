# Imports
from dotenv import load_dotenv
from menuRequest import menuRequest
from menuScrap import MenuScrap
import datetime
import time
import os


load_dotenv("./.env")
sleepTime = int(os.environ.get("SLEEP"))
while(True):
    print('Im in')
    now = datetime.datetime.now()
    if now.weekday() == 5 or now.weekday() == 6 or now.weekday() == 0:
        try:
            menuRequest()
        except Exception as e:
            print(e)
            try:
                MenuScrap()
            except Exception as e:
                print(e)
    time.sleep(sleepTime)


