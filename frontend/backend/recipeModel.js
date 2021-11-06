const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// schema is the class

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "A Foodify Special Recipe",
  },
  hashTagList: {
    type: [String],
    required: true,
    default: undefined,
  },
  postDate: {
    type: String,
    default: "September 20, 2021",
  },
  estimatedTime: {
    type: String,
    default: "9.5 minutes",
  },
  ingredientList: {
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
    required: true,
    default:
      "https://image.shutterstock.com/shutterstock/photos/1931420096/display_1500/stock-photo-various-spices-in-a-bowls-on-black-concrete-background-top-view-copy-space-1931420096.jpg",
  },
  userName: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
