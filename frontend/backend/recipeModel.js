const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "A Foodify Special Recipe",
  },
  hashTag: {
    type: String,
    default: "#topFoodifyPicks",
  },
  postDate: {
    type: String,
    default: "September 20, 2021",
  },
  estimatedTime: {
    type: String,
    default: "99999 minutes",
  },
  ingredientlist: {
    type: [String],
    default: undefined,
  },
  dietTagList: {
    type: [String],
    default: undefined,
  },
  story: {
    type: String,
    required: false,
  },
  imgUrl: {
    type: String,
    default:
      "https://image.shutterstock.com/shutterstock/photos/1931420096/display_1500/stock-photo-various-spices-in-a-bowls-on-black-concrete-background-top-view-copy-space-1931420096.jpg",
  },
  reviewerId: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
