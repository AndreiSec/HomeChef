from flask import Flask, render_template, request
import subprocess as sp
from pymongo import MongoClient
from mongopass import mongopass
import certifi

app = Flask("myapp")
 

client = MongoClient(mongopass,tlsCAFile=certifi.where())
db = client.HomeChef
myCollection = db.Recipes

@app.route("/")
def my_home():
    return render_template("home.html")

@app.route("/curd")
def curd():
    return render_template("curd.html")

@app.route("/insert")
def insert():
    label = []
    ingred = request.args.get("Ingredient")
    ingreds = ingred.split(',')
    select = request.args.get('choose')
    print("nbi")
    for j in myCollection.find({ 'recipe.ingredients.food': {'$all':ingreds}}):
            label.append(j['recipe']['label'])

    return render_template("recipe.html",labels = label)
