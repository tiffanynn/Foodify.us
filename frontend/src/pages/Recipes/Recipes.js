import "./Recipes.css";
import React from "react";
import RecipeInfo from "./RecipeInfo.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Recipe() {
  const { urlRecipeId } = useParams();
  let [recipeStateData, setRecipeStateData] = useState([]); // recipeStateData Initialized to Null

  //Fetches Recipe Data From API (After Component Is Rendered),
  //Saves Data to State using 'setRecipeStateData'
  useEffect(() => {
    fetch(`http://localhost:5000/recipe/${urlRecipeId}`)
      .then((response) => response.json())
      // Setting recipe Data to the data that we received from the response above
      .then((data) => {
        console.log("RECIEVED API RESPONSE RECIPE DATA: ", data);
        setRecipeStateData(data);
      });
  }, []);

  return (
    <div id="recipe_page">
      {recipeStateData.length == 0 ? (
        <div>Loading Recipe</div>
      ) : (
        <RecipeInfo recipeData={recipeStateData.recipe[0]} />
      )}
    </div>
  );
}
