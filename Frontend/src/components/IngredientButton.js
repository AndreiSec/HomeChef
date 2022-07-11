import React, { useState } from "react";

export const IngredientButton = (props) => {
  const [cls, setCls] = useState("ingredient_button");

  const ingredient = props.ingredient;
  const addOrRemoveSelectedIngredient = props.addOrRemoveSelectedIngredient;

  const buttonClick = (e) => {
    addOrRemoveSelectedIngredient(e);

    if (cls === "ingredient_button") {
      setCls("ingredient_button selected");
    } else {
      setCls("ingredient_button");
    }
  };

  return (
    <div>
      <button className={cls} onClick={(e) => buttonClick(e)}>
        {ingredient}
      </button>
    </div>
  );
};
