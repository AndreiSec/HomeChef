from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from bing_image_urls import bing_image_urls
import subprocess as sp
from pymongo import MongoClient
from mongopass import mongopass
import certifi

app = Flask("myapp")

CORS(app)


client = MongoClient(mongopass, tlsCAFile=certifi.where())
db = client.HomeChef
myCollection = db.Recipes_Updated

def get_ingredients():
    # ingredients = myCollection.aggregate(
    #     [

    #         {
    #             "$unwind": "$recipe.ingredients"
    #         },


    #         {
    #             "$group": {
    #                 "_id": "$recipe.ingredients.food",
    #                 "category": {"$first": '$recipe.ingredients.foodCategory'}
    #             }
    #         },

    #         {
    #             "$project" : {
    #                 "_id" : "$_id",
    #                 "name" : "$_id",
    #                 "category" : "$category",

    #             }
    #         },

    #     ]
    # )

    ingredients = list(myCollection.distinct("recipe.ingredients.food"))
    # ingredients.sort(key=lambda x: x)

    # print("ingredients ", ingredients)

    # n = 0

    # for ingredient in ingredients:
    #     n += hash(ingredient['name'])
    # print(n)

    # for ingredient in ingredients:
    #     print(ingredient)

    blacklisted_category = {"0",
                            "beer", "bov", "cocktails and liquors",
                            "frozen grained based", "liquors and cocktails", "mexican",
                            "mixed grains", "mixed soup", "pastries", "pizza", "wines"
                            }

    classified_ingredients = {}
    ingredients_met = {}

    for ingredient in ingredients:
        try:
            ingredient_name = ingredient.lower()
            # print("NAME: " + ingredient_name)

            match = myCollection.find_one({"recipe.ingredients.food" : ingredient_name} ,
            { "_id": 0, 'category': {"$first" : "$recipe.ingredients.foodCategory"} }
            )

            # print(match)

            category = match["category"]
            
            # print("-----------------")
            # print(ingredient_name + "  " + category)
            # print("-----------------")

        
            if category not in classified_ingredients and category not in blacklisted_category:
                classified_ingredients[category] = []

            if ingredient_name not in ingredients_met and len(classified_ingredients[category]) < 20:
                classified_ingredients[category].append(ingredient_name)
                ingredients_met[ingredient_name] = 1
        except Exception as e:
            # print(e)
            continue

    classified_ingredients_list = []

    for category in classified_ingredients.keys():
        ingredients = classified_ingredients[category]

        ingredients.sort(key=lambda x: x)

        new_obj = {}
        new_obj['category'] = category
        new_obj['foods'] = ingredients
        classified_ingredients_list.append(new_obj)

    classified_ingredients_list.sort(key=lambda x: x['category'])

    return classified_ingredients_list


@app.route("/getRecipes", methods=['POST'])
def getRecipes():
    try:

        label = []
        data = request.get_json()

        ingredients = data['ingredients']

        # select = request.args.get('choose')

        for j in myCollection.find({'recipe.ingredients.food': {'$all': ingredients}}):
            label.append(j['recipe'])

        for i in range(len(label)):
            recipeObj = label[i]
            recipeObj.pop('images', None)
            recipeObj.pop('image', None)
            recipeObj.pop('uri', None)
            recipeObj.pop('ingredients', None)

        return(jsonify({"success": 'true', 'recipe_objects': label}))

    except Exception as e:
        return {"success": 'false', "message": str(e)}


@ app.route('/ingredients', methods=['GET'])
def ingredients():
    try:
        response = jsonify({'ingredient_info': get_ingredients()})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    except Exception as e:
        return {"success": 'false', "message": str(e)}
