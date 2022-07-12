import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeSearch.scss";
import "./Button.scss";
import TextField from "@mui/material/TextField";
import IngredientCard from "./IngredientCard";
import CardItem from "./CardItem";
import { Button } from "./Button";

function RecipeSearch() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [ingredientsObject, setIngredientsObject] = useState([]);

  const [searchedIngredientsObject, setSearchedIngredientsObject] = useState(
    []
  );

  const [recipes, setRecipes] = useState([]);

  const getIngredients = async () => {
    const response = await axios.get(`http://127.0.0.1:5000/ingredients`);
    const ingredients = response.data.ingredient_info;
    setIngredientsObject(ingredients);
    setSearchedIngredientsObject(ingredients);
  };

  const renderIngredientCards = () => {
    if (searchedIngredientsObject === []) {
      return null;
    }
    console.log("F");

    return searchedIngredientsObject.map((ingredient) => (
      <IngredientCard
        title={ingredient.category}
        buttonClass="ingredient_button"
        key={"key " + ingredient.category}
        ingredients={ingredient.foods}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
    ));
  };

  useEffect(() => {
    if (selectedIngredients.length === 0) {
      console.log("DDD");
    }
  }, [selectedIngredients]);

  const searchChange = (e) => {
    const searchTerm = e.target.value;

    if (searchTerm === "") {
      console.log("RESETTING SEARCHED OBJECTS");
      setSearchedIngredientsObject(ingredientsObject);
      return;
    }

    let updatedIngredientsObjects = ingredientsObject.filter((x) => {
      const ingredientMatched = x.foods.some((f) => {
        return f.toLowerCase().includes(searchTerm.toLowerCase());
      });

      return ingredientMatched;
    });

    updatedIngredientsObjects = JSON.parse(
      JSON.stringify(updatedIngredientsObjects)
    );

    for (let i = 0; i < updatedIngredientsObjects.length; i++) {
      let category_foods = updatedIngredientsObjects[i].foods;

      category_foods = category_foods.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );

      updatedIngredientsObjects[i].foods = category_foods;
    }

    // updatedIngredientsObjects.forEach((x) => {
    //   x.foods.forEach((f) => {
    //     if (!f.toLowerCase().includes(searchTerm.toLowerCase())) {
    //       updatedIngredientsObjects = updatedIngredientsObjects.filter(
    //         (item) => item !== f
    //       );
    //     }
    //   });
    // });

    setSearchedIngredientsObject(updatedIngredientsObjects);
  };

  const renderRecipeCards = (group) => {
    return group.map((recipe) => (
      <CardItem
        src={recipe.image_url}
        text={recipe.label}
        label={recipe?.dietLabels ? recipe.dietLabels[0] : "High-Protein"}
        path={recipe?.url ? recipe.url : "google.com"}
      />
    ));
  };

  const renderRecipeCardRows = () => {
    if (recipes === []) {
      return null;
    }

    return recipes.map((recipeGroup) => (
      <ul className="cards__items">{renderRecipeCards(recipeGroup)}</ul>
    ));
  };

  const getRecipes = async () => {
    const response = await axios.post(`http://127.0.0.1:5000/getRecipes`, {
      ingredients: selectedIngredients,
    });

    const { recipe_objects } = response.data;

    const recipes_grouped = [];
    let recipe_subset = [];
    let i = 0;

    recipe_objects.forEach((recipe) => {
      if (i > 2) {
        recipes_grouped.push(recipe_subset);
        recipe_subset = [];
        i = -1;
      } else {
        recipe_subset.push(recipe);
      }

      i += 1;
    });

    recipes_grouped.push(recipe_subset);

    setRecipes(recipes_grouped);
  };

  const resetSelection = () => {
    setSelectedIngredients([]);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  // useEffect(() => {
  //   console.log("INGREDIENTS UPDATED: ", searchedIngredientsObject);
  // }, [searchedIngredientsObject]);

  return (
    <div className="cards">
      <Button
        className="search_food_button"
        buttonStyle="btn--green"
        buttonSize="btn--large--dark--green"
        onClick={getRecipes}
      >
        Search for Recipes
      </Button>
      <div className="spacing" />
      {/* {renderSelected()} */}
      <div className="top_container">
        <div className="ingredients_select_container">
          <div className="search">
            <button
              className="remove-selections-button"
              onClick={resetSelection}
            >
              Remove Selections
            </button>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search for Ingredients"
              onChange={(e) => searchChange(e)}
            />
          </div>
          {ingredientsObject !== [] ? renderIngredientCards() : null}
        </div>
        <div className="food_results_container">
          <ul className="recipes_cards_list">{renderRecipeCardRows()}</ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeSearch;
