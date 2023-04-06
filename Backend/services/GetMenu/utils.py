# imports
import sys
sys.path.append(r"C:\Python310\Lib\site-packages")
from bs4 import BeautifulSoup
import requests
from dateutil import parser
import datetime

# functions
def extractDays(doc):
    
    # get days on upper corner right
    ulDays = doc.find_all("ul", {"class": "nav navbar-nav navbar-right"})
    
    # extract a tag
    for tag in ulDays:
        aDays = tag.find_all(href=True)
    
    # get days
    days = []
    for a in aDays:
        days.append(a.get("href")[3:])
    
    return days


def joinObs(sideDishes):
    # initialize definitive side dishes
    defSideDishes = []

    for i in range(len(sideDishes)):
        
        # initialization
        defSideDishes.append([])
        inObs = False
        obs = ''
        for entry in sideDishes[i]:
            
            # if in observations, start appending them
            if entry == 'Observações:':
                inObs = True
        
            # append observations
            if inObs:
                obs += entry
                continue
            
            #pprint(entry)
            defSideDishes[i].append(entry)
        defSideDishes[i].append(obs)
    
    return defSideDishes

def getDayMeal(doc):

    # get type
    typeH2 = doc.find_all("h2",{"class": "menu-section-title"})
    typeMeal =list(map(lambda h2: h2.get_text(), typeH2))

    # get main dish
    mainDishDiv = doc.find_all("div",{"class":"menu-item-name"})
    mainDish = list(map(lambda div: div.get_text(),mainDishDiv))

    # get rest of menu
    sideDisheDiv = doc.find_all("div", {"class":"menu-item-description"})

    # initialize all side dishes
    allSideDishes = []

    # separate all side dishes in lists
    for sideDish in sideDisheDiv:
        sideDishString = sideDish.get_text(separator = '\n', strip=True)
        sideDishList = sideDishString.split('\n')
        allSideDishes.append(sideDishList)
    
    # join obs into one variable
    allSideDishes = joinObs(allSideDishes)

    allDishes = allSideDishes
    
    # join both
    for i in range(len(allDishes)):
        allDishes[i].append(mainDish[i])
        allDishes[i].append(typeMeal[i])

    return allDishes


def extractMenu(url, days):
    menu = []
    for day in days:
        # get url
        dayUrl = url+"?d="+ day
        
        # get html
        dayHtml = getHtml(dayUrl)
        
        # get meal
        daysMeals = getDayMeal(dayHtml)
        
        # append day
        daysMeals.append(day)
        
        # join to menu list
        menu.append(daysMeals)
        
    return menu



def getHtml(url):
    
    # GET html
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    html = response.text

    return BeautifulSoup(html, "html.parser")


def parseMenu(menu):
    meals = []

    for day in menu:
        # get day
        data = parser.parse(day[-1])

        for i in range(len(day)-1):
            
            meal = {}
            meal["DATA"] = data
            meal["ACOMPANHAMENTO"] = day[i][0]
            meal["GUARNICAO"] = day[i][1]
            meal["SALADA"] = day[i][2]
            meal["SOBREMESA"] = day[i][3]
            meal["SUCO"] = day[i][4]
            meal['OBS'] = day[i][5]
            meal["PRATO PRINCIPAL"] = day[i][6]
            meal["TIPO"] = day[i][7]
            meals.append(meal)
    meals = mongoShape(meals)

    return meals

def possibleChanges(startDate, EndDate, updatedMenu, collection):
    # get entries from the mongo
    # if that entry already exits
    #       check if they are the same
    #           if not, replace
    # else
    #       add entry
    #
    # create query
    query = {'DATA': {'$gte': startDate, '$lte': EndDate}}
    
    # get response from mongo
    results = collection.find(query)
    
    

    for i in range(len(updatedMenu)):
        for result in results:
            if updatedMenu[i]['DATA'] == result['DATA']:
                
                resultCopy = result.copy()
                resultCopy.pop("_id")
                print(updatedMenu[i] == resultCopy)
                break

    



def mongoShape(meals):

    # auxiliar list for checking visited days
    days = []

    # parsed list
    monogoList = []
    for meal in meals:

        # case data comes as a string
        if type(meal['DATA']) == str:
            meal['DATA'] = datetime.datetime.strptime(meal['DATA'], '%Y-%m-%d')

        # check if I need to create a new day
        if meal['DATA'] not in days:
            days.append(meal['DATA'])
            day = {
                "DATA": meal['DATA'],
            }
            monogoList.append(day)

        # get mongolist instance
        for i in range(len(monogoList)):

            if monogoList[i]["DATA"] == meal["DATA"]:
                obs = meal["OBS"].replace('<FONT COLOR ="RED">', '')
                obs = obs.replace('Observações:', '')
                
                # add meal to corresponding type
                monogoList[i][meal["TIPO"]] = {
                    "ACOMPANHAMENTO": meal["ACOMPANHAMENTO"],
                    "GUARNICAO": meal["GUARNICAO"],
                    "SALADA": meal["SALADA"],
                    "SOBREMESA" : meal["SOBREMESA"],
                    "SUCO" : meal["SUCO"],
                    "OBS": obs,
                    "PRATO PRINCIPAL": meal["PRATO PRINCIPAL"]      
                }

    return monogoList
