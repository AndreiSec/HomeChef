from pymongo import MongoClient
import requests
import pymongo
import certifi
from mongopass import mongopass
import time


client = MongoClient(mongopass,tlsCAFile=certifi.where())
db = client.HomeChef
myCollection = db.Recipes

#response = requests.get('https://api.edamam.com/api/recipes/v2?type=public&q=a&app_id=2bb997e9&app_key=%204b321b34755eb52f6060bcba2887804e%09&imageSize=REGULAR&field=uri&field=label&field=image&field=images&field=source&field=url&field=dietLabels&field=healthLabels&field=ingredients&field=calories&field=cuisineType&field=mealType&field=dishType')
#data = response.json()

#myCollection.insert_one(test1)
#recipe_list = []
#counter = 1
#while counter <= 500:
#    if('hits' in data):
#        for i in data['hits']:
#            recipe_list.append(i)
#            myCollection.insert_one(i)
#        counter = counter + 1
#        print(len(recipe_list))
#    else:
#        counter = counter + 20
#    
#    if('_links' in data):
#        newResponse = requests.get(data['_links']['next']['href'])
#        x = data['_links']['next']['href']
#        c.append(x)
#        data = newResponse.json()
#    else:
#        break
#    time.sleep(7)

#print(c[len(c)-1])


#print(myCollection.distinct('recipe.ingredients.food'))

def get_ingredients():

    ingredients = myCollection.aggregate(
        [
            {
                "$unwind": "$recipe.ingredients"},


            {
                "$group": {
                    "_id": "$recipe.ingredients.food",
                    "category": {"$first": '$recipe.ingredients.foodCategory'}
                }
            },

        ]
    )

    classified_ingredients = {}

    ingredients_met = {}

    for ingredient in ingredients:
        try:
            category = ingredient["category"].lower()

            ingredient_name = ingredient["_id"].lower()

            if category not in classified_ingredients:
                classified_ingredients[category] = []

            if ingredient_name not in ingredients_met and len(classified_ingredients[category]) < 20:
                classified_ingredients[category].append(ingredient_name)
        except:
            continue

    return classified_ingredients
print(get_ingredients())