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

// OLD DEPRECATED TEMPORARY RECIPE JSON DB
/*
 const recipeData = {
    ID: "1234",
    Hashtag: "francofoodtips",
    Title: "Why is it so hard to make cereal ?",
    Date: "2021-05-18",
    Rating: "4.2/5",
    EstimatedTime: "20 minutes",
    IngredientsList: [
      "2 cups Cereal Grain",
      "1 pint of oat milk",
      "ground wild almond",
      "flax seeds",
    ],
    DietTags: ["pescatarian", "paleo"],
    Story:
      "Your eyes crack open, the room is bright. It’s 10 Am, and you’ve slept through all 3 of your alarms. Karen, your mother-in-law will be coming for brunch in just half an hour. You’re feeling anxious, but you have just the right recipe. Cereal. Gently lower your grain of choice into a round bowl. Lather top with fresh milk. Finish with toppings. Serve cold.",
    ImageURL:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/feaa97ad73e74183b4af84e2fafd8c68.png",
  };
  */
