const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// schema is the class

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profileImgUrl: {
    type: String,
  },
  recipeIdList: {
    type: [String],
  },
  followerUserIdList: {
    type: [String],
  },
  followingUserIdList: {
    type: [String],
  },
  mainText: {
    type: String,
    required: false,
  },
  subText: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
