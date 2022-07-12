import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./IngredientCard.scss";
import { Button } from "./Button";
import { IngredientButton } from "./IngredientButton";

const IngredientCard = (props) => {
  const title = props.title;
  const ingredients = props.ingredients || [];
  const selectedIngredients = props.selectedIngredients;
  const setSelectedIngredients = props.setSelectedIngredients;

  const buttonClass = props.buttonClass;

  const addOrRemoveSelectedIngredient = (e) => {
    const ingredient = e.target.innerHTML;

    if (!selectedIngredients.includes(ingredient)) {
      // const newSelectedIngredients = selectedIngredients;
      // newSelectedIngredients.push(ingredient);
      setSelectedIngredients((selectedIngredients) => [
        ...selectedIngredients,
        ingredient,
      ]);
    } else {
      const newSelectedIngredients = selectedIngredients.filter(
        (item) => item !== ingredient
      );
      setSelectedIngredients(newSelectedIngredients);
    }
  };

  const renderIngredient = () => {
    return ingredients.map((ingredient) => (
      <IngredientButton
        ingredient={ingredient}
        buttonClass={buttonClass}
        key={ingredient}
        addOrRemoveSelectedIngredient={addOrRemoveSelectedIngredient}
      />
    ));
  };

  return (
    <Card key={title} className="ingredient_card">
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <div className="ingredients_container">{renderIngredient()}</div>
      </CardContent>
    </Card>
  );
};

export default IngredientCard;
