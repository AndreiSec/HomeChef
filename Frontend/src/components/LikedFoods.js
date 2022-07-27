import React from "react";
import "./LikedFoods.scss";
import CardItem from "./CardItem";

function LikedFoods() {
  return (
    <div className="cards">
      <h1>Foods you have enjoyed in the past ❤️</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/baked_chicken.jpeg"
              text="Sriracha Chicken Thighs"
              label="High-Protein"
              path="/recipe/"
            />
            <CardItem
              src="images/bibimbap.webp"
              text="Bibimbap"
              label="Healthy Choice"
              path="/recipe/"
            />
            <CardItem
              src="images/chicken_shawarma.png"
              text="Chicken Shawarma"
              label="High-Protein"
              path="/recipe/"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/fried_noodles.jpeg"
              text="Egg Fried Noodles"
              label="High-Carb"
              path="/recipe/"
            />
            <CardItem
              src="images/fruit_cake.jpeg"
              text="Fruit Cake"
              label="Dessert"
              path="/recipe/"
            />
            <CardItem
              src="images/gyro.jpeg"
              text="Chicken Gyro"
              label="High-Protein"
              path="/recipe/"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/kimchi.webp"
              text="Kimchi"
              label="Sides"
              path="/recipe/"
            />
            <CardItem
              src="images/pasta.jpeg"
              text="Seafood Pasta"
              label="High-Carb"
              path="/recipe/"
            />
            <CardItem
              src="images/mango_yogurt.jpeg"
              text="Mango Ice Cream"
              label="Dessert"
              path="/recipe/"
            />
            <CardItem
              src="images/ramen.jpeg"
              text="Japanese Ramen"
              label="High-Protein"
              path="/recipe/"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LikedFoods;
