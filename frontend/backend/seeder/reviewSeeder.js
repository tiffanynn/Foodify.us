const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// schema is the class

const Recipe = require("../recipeModel");
const User = require("../userModel");
const Review = require("../reviewsModel");
const commentData = require("../seeddata/commentData.js");

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

async function seedComments() {
  Review.collection.drop();
  console.log("REVIEW COLLECTION DROPPED");

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

  //Loops Seeder X amount of times (Should be x * 50 total comments)
  for (var x = 0; x < 10; x++) {
    for (var i = 0; i < commentData.length; i++) {
      console.log(commentData[i]);
      let randomUser =
        allUsersArray[Math.floor(Math.random() * allUsersArray.length)];

      let randomRecipe =
        allRecipesArray[Math.floor(Math.random() * allRecipesArray.length)];

      const ratingArray = [
        1, 1.5, 2, 2.5, 3, 3, 3, 3, 3, 3, 3, 3, 3.5, 3.5, 3.5, 4, 4.5, 4.5, 4.5,
        4.5, 4.5, 5, 5, 5,
      ];
      const recipeId = randomRecipe._id;
      const userName = randomUser.userName;
      const reviewBody = commentData[i];
      const rating =
        ratingArray[Math.floor(Math.random() * ratingArray.length)];

      const newReview = new Review({
        recipeId,
        reviewBody,
        rating,
        userName,
      });

      newReview
        .save()
        .then(() =>
          console.log(
            `review: ${recipeId}, ${reviewBody}, ${rating}, ${userName}, saved`
          )
        );
    }
  }
}

module.exports = seedComments();
