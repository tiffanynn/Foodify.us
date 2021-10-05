import "./Recipes.css";
import React from "react";
import RecipeInfo from "./RecipeInfo.js";

export default function Recipe() {
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

  return (
    <div id="recipe_page">
      <RecipeInfo recipeData={recipeData} />
    </div>
  );
}
