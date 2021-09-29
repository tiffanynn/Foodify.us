import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  const recipeListData = {
    recipes: [
      {
        ID: "1234",
        Hashtag: "francofoodtips",
        Title: "Why is it so hard to make cereal ?",
        Date: "2021-05-18",
        EstimatedTime: "20",
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
      },
      {
        ID: "1235",
        Hashtag: "A timeless vegan recipe",
        Title: "5 tips to spice up your brunch avocado toast",
        Date: "2021-08-19",
        EstimatedTime: "10",
        IngredientsList: [
          "1 toast",
          "1/2 avocado",
          "a dash of pepper & salt",
          "1 spoon chili flakes",
          "1 vegan Just Egg",
        ],
        DietTags: ["vegan", "pescatarian", "paleo", "gluten free"],
        Story:
          "Your eyes crack open, the room is bright. It’s 10 Am, and you’ve slept through all 3 of your alarms. Karen, your mother-in-law will be coming for brunch in just half an hour. You’re feeling anxious, but you have just the right recipe. Cereal. Gently lower your grain of choice into a round bowl. Lather top with fresh milk. Finish with toppings. Serve cold.",
        ImageURL:
          "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/feaa97ad73e74183b4af84e2fafd8c68.png",
      },
      {
        ID: "1236",
        Hashtag: "Not authentic but yummy",
        Title: "A great use for an unused panini maker",
        Date: "2021-01-18",
        EstimatedTime: "40",
        IngredientsList: [
          "1 tortilla",
          "1 cup mashed beans",
          "1/2 avocado",
          "1/2 cup corn",
        ],
        DietTags: ["pescatarian", "paleo", "vegan"],
        Story:
          "This is a tortilla that someone put cheese and beans inside of. Then this thing was put in a panini maker. Then it was taken out of the panini maker. After that it was put on a weird grey plate normal people don’t actually eat out of. Top with a squeeze of lemon juice and serve with a side of your favorite avocado-based dipping sauce.",
        ImageURL:
          "https://randomwordgenerator.com/img/picture-generator/57e2d64a4a55ab14f1dc8460962e33791c3ad6e04e50744172297cdc9f45c3_640.jpg",
      },
    ],
  };

  return (
    <div className="cards">
      <h1>Check out these EPIC Destinations!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {recipeListData.recipes.map}
            {recipeListData.recipes.map((recipe) => (
              <CardItem
                src={recipe.ImageURL}
                text={recipe.Title}
                label={recipe.Hashtag}
                path="/services"
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
