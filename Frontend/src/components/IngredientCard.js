import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./IngredientCard.scss";

const IngredientCard = (props) => {
  const title = props.title;
  const ingredients = props.ingredients || [];
  const selectedIngredients = props.selectedIngredients;
  const setSelectedIngredients = props.selectedIngredients;

  const renderIngredient = () => {
    return ingredients.map((ingredient) => (
      <div className="ingredient_text">
        <Button
          size="medium"
          variant="outlined"
          style={{
            color: "#F3F3F3",
            borderRadius: 13,
            backgroundColor: "#00B833",
          }}
        >
          {ingredient}
        </Button>
      </div>
    ));
  };

  return (
    <Card className="ingredient_card">
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <div className="ingredients_container">{renderIngredient()}</div>
      </CardContent>
      <CardActions>
        <Button size="small">Remove Selections</Button>
      </CardActions>
    </Card>
  );
};

export default IngredientCard;
