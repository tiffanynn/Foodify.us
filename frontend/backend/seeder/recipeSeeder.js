const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// schema is the class

var seedData = require("../seeddata/recipeData.js");
//const seedDataExtra = require("../seeddata/recipeDataExtra.js");
var seedDataChicken = require("../seeddata/recipeDataChicken.js");

//seedData = seedData.concat(seedDataExtra);
seedData = seedData.concat(seedDataChicken);

const Recipe = require("../recipeModel");

function Seed() {
  Recipe.collection.drop();
  console.log("RECIPE COLLECTION DROPPED");
  console.log(seedData.length);

  for (i = 0; i < seedData.length; i++) {
    console.log(i);
    const title = seedData[i].name;
    const hashTagList = ["#topFoodifyPicks", "#foodies4lyfe"];
    const postDate = new Date(seedData[i].updated_at); //Converts from Unix TimeStamp to human readable
    const estimatedTime = seedData[i].total_time_minutes;

    //Extracts ingredients
    var ingredientList = [];
    //console.log(seedData[i].sections[0].components[0].raw_text);
    if (seedData[i].sections != null) {
      if (seedData[i].sections[0] != null) {
        if (seedData[i].sections[0].components[0].raw_text != null) {
          var ingredientsData = seedData[i].sections[0].components;
          for (var x = 0; x < ingredientsData.length; x++) {
            ingredientList.push(ingredientsData[x].raw_text);
          }
        } else {
          console.log(" NO SEEDATA[i].sections.components FOUND FOR: " + title);
        }
      } else {
        console.log(" NO SEEDDATA[i].sections FOUND FOR : " + title);
      }
    }

    //Randomly Assigns 2 unique diet Tags from our list
    const dietTags = [
      "vegan",
      "vegetarian",
      "paleo",
      "pescatarian",
      "keto friendly",
    ];
    var dietTagList = [];
    dietTagList[0] = dietTags[Math.floor(Math.random() * dietTags.length)];
    dietTagList[1] = dietTagList[0];
    while (dietTagList[0] == dietTagList[1]) {
      // Keeps looking for a unique Diet Tag
      dietTagList[1] = dietTags[Math.floor(Math.random() * dietTags.length)];
    }
    //Compiles To Instructions into a story
    var story = "";
    if (seedData[i].instructions != null) {
      var recipeInstructions = seedData[i].instructions;
      for (var y = 0; y < recipeInstructions.length; y++) {
        story = story + recipeInstructions[y].display_text;
      }
    }
    const imgUrl = seedData[i].thumbnail_url;
    const userName = "defaultUser";

    const newRecipe = new Recipe({
      title,
      hashTagList,
      postDate,
      estimatedTime,
      ingredientList,
      dietTagList,
      story,
      imgUrl,
      userName,
    });

    newRecipe.save().then(() => console.log(`recipe: ${title}, saved`));
  }
}

module.exports = Seed();
