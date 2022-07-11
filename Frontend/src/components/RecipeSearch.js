import React, { useState } from "react";
import "./RecipeSearch.scss";
import "./Button.scss";
import TextField from "@mui/material/TextField";
import IngredientCard from "./IngredientCard";
import { Button } from "./Button";

function RecipeSearch() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const ingredientTypes = ["Meats", "Veggies", "Grains", "Liquids"];

  const testMeatsIngredients = [
    "Chicken Thighs",
    "Ground Beef",
    "Veal Chops",
    "Pork Chops",
    "Lamb Skewers",
    "Ground Turkey",
    "Brocolli",
    "Tofu",
    "Spinach",
  ];

  const renderIngredientCards = () => {
    return ingredientTypes.map((ingredient) => (
      <IngredientCard
        title={ingredient}
        key={ingredient}
        ingredients={testMeatsIngredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
    ));
  };

  return (
    <div className="cards">
      <Button
        className="search_food_button"
        buttonStyle="btn--green"
        buttonSize="btn--large--dark--green"
      >
        Search for Recipes
      </Button>
      <div className="top_container">
        <div className="ingredients_select_container">
          <div className="search">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search for Ingredients"
            />
          </div>
          {renderIngredientCards()}
        </div>
        <div className="food_results_container">
          <div className="cards__wrapper">
            <ul className="cards__items"></ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeSearch;
