from flask import Flask, render_template, request, jsonify
import traceback
from flask_cors import CORS, cross_origin
from bing_image_urls import bing_image_urls
import subprocess as sp
from pymongo import MongoClient
from mongopass import mongopass
import certifi

app = Flask("myapp")

CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'


client = MongoClient(mongopass, tlsCAFile=certifi.where())
db = client.HomeChef
myCollection = db.Recipes_Updated


def get_ingredients():
    ingredients = myCollection.aggregate(
        [

            {
                "$unwind": "$recipe.ingredients"
            },

            {
                "$group": {
                    "_id": "$recipe.ingredients.food",
                    "category": {"$first": '$recipe.ingredients.foodCategory'}
                }
            },

            {
                "$project": {
                    "name": "$_id",
                    "category": "$category",

                }
            },

        ]
    )

    # print(len(list(ingredients)))

    ingredients_list = list(ingredients)

    ingredients_list.sort(key=lambda x: x['name'])

    # ingredients_distinct = myCollection.distinct("recipe.ingredients.food")

    # print(len(list(ingredients_distinct)))

    # ingredients.sort(key=lambda x: x)

    # print("ingredients ", ingredients)

    # n = 0

    # for ingredient in ingredients:
    #     n += hash(ingredient['name'])
    # print(n)

    # f = open("output.txt", "a+")

    # for ingredient in ingredients_list:
    #     f.write(str(ingredient['name']))
    #     f.write('\n')

    # f.close()

    blacklisted_category = {"0",
                            "beer", "bov", "cocktails and liquors",
                            "frozen grained based", "liquors and cocktails", "mexican",
                            "mixed grains", "mixed soup", "pastries", "pizza", "wines"
                            }

    classified_ingredients = {}
    ingredients_met = {}

    for ingredient in ingredients_list:
        try:
            ingredient_name = ingredient['name'].lower()
            # print("NAME: " + ingredient_name)

            # match = myCollection.find_one(
            #     {"recipe.ingredients.food": ingredient_name}, {'recipe.ingredients.foodCategory': 1})

            # print(match)

            category = ingredient["category"].lower()

            # print("-----------------")
            # print("category " + category)
            # print("-----------------")

            if category not in classified_ingredients and category not in blacklisted_category:
                classified_ingredients[category] = []

            if ingredient_name not in ingredients_met:
                classified_ingredients[category].append(ingredient_name)
                ingredients_met[ingredient_name] = 1
        except Exception as e:
            # print(e)
            continue

    classified_ingredients_list = []

    for category in classified_ingredients.keys():
        ingredients = classified_ingredients[category]
        # print(category)

        ingredients.sort(key=lambda x: x)

        new_obj = {}
        new_obj['category'] = category
        new_obj['foods'] = ingredients
        classified_ingredients_list.append(new_obj)

    # print(classified_ingredients_list)

    classified_ingredients_list.sort(key=lambda x: x['category'])

    return classified_ingredients_list


@app.route("/getRecipes", methods=['POST'])
@cross_origin()
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
        print(traceback.format_exc())
        return {"success": 'false', "message": str(e)}


@ app.route('/ingredients', methods=['GET'])
@cross_origin()
def ingredients():
    try:
        response = jsonify({'ingredient_info': get_ingredients()})
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    except Exception as e:
        print(traceback.format_exc())
        return {"success": 'false', "message": str(e)}
