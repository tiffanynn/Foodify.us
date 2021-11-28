const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// schema is the class

const ReviewSchema = new Schema({
  recipeId: {
    type: String,
    required: true,
    default: undefined,
  },
  reviewBody: {
    type: String,
    required: false,
    default: undefined,
  },
  profileImgUrl: {
    type: String
  },
  rating: {
    type: Number,
    required: false,
    default: undefined,
  },
  postDate: {
    type: String,
    default: "September 20, 2021",
  },
  userName: {
    required: true,
    type: String,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
