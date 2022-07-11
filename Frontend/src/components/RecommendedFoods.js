import React from "react";
import "./LikedRecommended.scss";
import CardItem from "./CardItem";

function RecommendedFoods() {
  return (
    <div className="cards">
      <h1>Foods we recommend for you.</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/chicken_burger.jpeg"
              text="Cajun Chicken Burger"
              label="High-Protein"
              path="/recipe/"
            />
            <CardItem
              src="images/korean-food.webp"
              text="Korean Pork Bowl"
              label="Healthy Choice"
              path="/recipe/"
            />
            <CardItem
              src="images/grilled-chicken.jpeg"
              text="Grilled Chicken"
              label="High-Protein"
              path="/recipe/"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/tacos.webp"
              text="Vegetable Tacos"
              label="Healthy Choice"
              path="/recipe/"
            />
            <CardItem
              src="images/kimchi-fried-rice.jpeg"
              text="Kimchi Fried Rice"
              label="High-Carb"
              path="/recipe/"
            />
            <CardItem
              src="images/chicken-wings.jpeg"
              text="BBQ Chicken Wings"
              label="High Protein"
              path="/recipe/"
            />
            <CardItem
              src="images/ribs.jpg"
              text="Grilled Pork Ribs"
              label="High-Protein"
              path="/recipe/"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/korean-fried-chicken.jpeg"
              text="Korean Fried Chicken"
              label="High Protein"
              path="/recipe/"
            />

            <CardItem
              src="images/salad.jpeg"
              text="Vegetable Salad"
              label="Healthy Option"
              path="/recipe/"
            />
            <CardItem
              src="images/chicken_and_rice.jpeg"
              text="Sriracha Chicken & Rice"
              label="High-Protein"
              path="/recipe/"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecommendedFoods;
