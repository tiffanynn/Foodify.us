const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Recipe = require("../recipeModel");
const User = require("../userModel");

function getAllUsers() {
  return new Promise((resolve, reject) => {
    User.find()
      .then((users) => {
        resolve(users);
      })
      .catch((err) =>
        console.log("ERROR FETCHING ALL USERS FOR USER SEED: ", err)
      );
  });
}

function getAllRecipes() {
  return new Promise((resolve, reject) => {
    Recipe.find()
      .then((recipes) => {
        resolve(recipes);
      })
      .catch((err) =>
        console.log("ERROR FETCHING ALL RECIPES FOR USER SEED: ", err)
      );
  });
}

function updateRecipe(currentRecipeId, userName) {
  return new Promise((resolve, reject) => {
    Recipe.findOne({ _id: currentRecipeId }, function (err, recipe) {
      console.log("FOUND RECIPE: ", recipe.title);
      recipe.userName = userName;

      recipe.save(function (err) {
        if (err) {
          console.error("ERROR!");
        }
      });
      console.log(
        "SAVED TO RECIPE: ",
        currentRecipeId,
        " username: ",
        userName
      );
      resolve("success");
    });
  });
}

//ADDS RECIPES RANDOMLY TO USERS
async function Seed() {
  let allUsers = await getAllUsers();
  let allRecipes = await getAllRecipes();
  let allRecipesArray = [];
  let allUsersArray = [];

  allRecipes.forEach(function (recipe) {
    allRecipesArray.push(recipe);
  });
  allUsers.forEach(function (user) {
    allUsersArray.push(user);
  });

  for (var i = 0; i < allRecipesArray.length; i++) {
    //Extract ID of Recipe
    let fullid = JSON.stringify(allRecipesArray[i]._id);
    let currentRecipeId = fullid
      .match(/(?:"[^"]*"|^[^"]*$)/)[0]
      .replace(/"/g, "");
    console.log("EDITING: ", currentRecipeId);

    const randomUserName =
      allUsersArray[Math.floor(Math.random() * allUsersArray.length)].userName;
    console.log("RANDOM USER NAME: ", randomUserName);
    await updateRecipe(currentRecipeId, randomUserName);
  }
}
module.exports = Seed();
