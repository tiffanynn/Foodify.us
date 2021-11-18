/****************************** SERVER STARTUP RELATED CODE: **********************************/
const express = require("express");

//idk why but it works
const cors = require("cors");
const url = require("url");
const mongoose = require("mongoose");
const Recipe = require("./backend/recipeModel");
const User = require("./backend/userModel");
const querystring = require("querystring");

// MONGODB CREDENTIALS
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; //Runs LocalHost Server on Port 5000

app.use(cors());
app.use(express.json());

//maybe helps parsing params issues
app.set("query parser", "extended");

/*
 *
 *
 *
 */
/********************** MONGODB DATABASE SETUP / CONNECTION AND USER SEEDING RELATED CODE: *****************************/
const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@foodifycluster.vcg2j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");

  /* UNCOMMENT BELOW TO SEED FRESH RECIPE TABLE ***** WARNING: ALL SAVED DB DATA IS LOST ******* */
  /* IGNORE INGREDIENT ERRORS, SAVE CONSOLE STATEMENTS MAY LAG  */
  /*
  console.log("BEGINNING SEED: ");
  var seeder = require("./backend/seeder/recipeSeeder");
  console.log("SEED COMPLETED");
  */
});

//SERVER API REQUESTS FROM OTHER FILES:
const mainRouter = require("./backend/routes/mainRouter");
//app.use("/REPLACE ME WITH A SINGLE ROUTE", mainRouter);

/*
 *
 *
 *
 */
/************************* RECIPE FEED RELATED ROUTES: **********************************/
//Notes:
// Req.params will contain url slashes
//SERVER API GET REQUEST EXAMPLE:
app.route("/").get((req, res) => {
  res.send("Hello World From Foodify Backend Server! :)");
});

// SENDS BACK ALL RECIPES IN DB
app.route("/feed").get((req, res) => {
  console.log("INCOMING FEED REQUEST");

  /* QUERIES DB FOR ALL RECIPES */
  Recipe.find()
    .then((recipes) =>
      res.send(JSON.parse('{"recipes" : ' + JSON.stringify(recipes) + "}"))
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

// SENDS BACK 1 RECIPE DATA CORRESPONDING TO RECIPE ID
app.route("/recipe/:recipeID").get((req, res) => {
  console.log("INCOMING RECIPE DATA REQUEST");
  var recipeID = req.params.recipeID;

  /* QUERIES DB BY RECIPE ID */
  Recipe.find({ _id: recipeID })
    .then((recipe) =>
      res.send(JSON.parse('{"recipe" : ' + JSON.stringify(recipe) + "}"))
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

/*
 *
 *
 *
 */
/************************* RECIPE SEARCH RELATED ROUTES: **********************************/

//SENDS BACK ALL RECIPES WITH CERTAIN DIET TAG
app.route("/searchbydiet/:dietTag").get((req, res) => {
  var dietTag = req.params.dietTag;
  console.log("INCOMING FEED REQUEST", dietTag);
  /* QUERIES DB FOR ALL RECIPES */
  Recipe.find({ dietTagList: dietTag })
    .then((recipes) =>
      res.send(JSON.parse('{"recipes" : ' + JSON.stringify(recipes) + "}"))
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

//SENDS BACK ALL RECIPES MATCHING SEARCH OR HASHTAG
app.route("/search/:filter").get((req, res) => {
  let parsedUrl = url.parse(req.params);
  let parsedQs = querystring.parse(parsedUrl.query);

  // var filter = req.params.filter;
  // var filterQuery = req.query;
  console.log("HERE", parsedQs);
  // console.log("HERE filterQuery", filterQuery.query);
  // console.log("HERE dietTags", filterQuery.dietTags);
  //var dietTags = req.params.dietTags;
  // console.log("PARAMS: ", req.params);
  // console.log("INCOMING FEED REQUEST", filter, "DIET TAGS: ");
  // for (let i = 0; i < filter.length(); i++) {
  //   if
  // }
  // var searchWord =
  //Identifies if query is hashtag search or normal search
  if (filter.substring(0, 1) == "#") {
    console.log("HASHTAG QUERY", filter);
    /* QUERIES DB FOR MATCHING HASHTAG*/
    Recipe.find({ hashTagList: { $regex: filter, $options: "i" } })
      .then((recipes) =>
        res.send(JSON.parse('{"recipes" : ' + JSON.stringify(recipes) + "}"))
      )
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    /* QUERIES DB FOR MATCHING RECIPE NAME*/
    Recipe.find({
      title: { $regex: filter, $options: "i" },
    })
      .then((recipes) =>
        res.send(JSON.parse('{"recipes" : ' + JSON.stringify(recipes) + "}"))
      )
      .catch((err) => res.status(400).json("Error: " + err));
  }
});

/*
 *
 *
 *
 */
/************************************* USER/PROFILE RELATED ROUTES: ************************************/

// SENDS BACK ALL Users IN DB
app.route("/user").get((req, res) => {
  console.log("INCOMING ALL USER REQUEST");

  /* QUERIES DB FOR ALL RECIPES */
  User.find()
    .then((users) =>
      res.send(JSON.parse('{"users" : ' + JSON.stringify(users) + "}"))
    )
    .catch((err) => res.status(400).json("Error: " + err));
});
//ADD GET USER BY USERNAME

//ADD EDIT USER BY USERNAME AND SECURED USER ID

//USER SIGNUP, ADDS USER TO USER DB
// SENDS BACK 1 RECIPE DATA CORRESPONDING TO RECIPE ID
app.route("/usersignup/:userID/:name").get((req, res) => {
  //GETS URL DATA FROM PARAMS
  var userId = req.params.userID;
  var name = req.params.name;

  // CHECK FOR INVALID NAME/ID IN USER SIGNUP
  if (userId == null) {
    res
      .status(400)
      .json(
        "Error: userID is null, new user upload to MongoDB database failed"
      );
  }
  if (name == null) {
    res
      .status(400)
      .json("Error: name is null, new user upload to MongoDB database failed");
  }
  console.log(
    "INCOMING NEW USER POST REQUEST: /usersignup/",
    userId,
    "/",
    name
  );

  //Some Default Fields (CHANGE LATER TO USER SIGNUP DATA)
  var profileImgUrl = "https://picsum.photos/300/300/?blur";
  var bio = "bio text goes here";
  var userName = "username from firebase";

  //Builds New User Object
  const newUser = new User({
    userId,
    userName,
    name,
    bio,
    profileImgUrl,
  });

  //Saves New User Object To MongoDB Atlas
  newUser
    .save()
    .then(() => console.log(`USER: ${name}, ID: ${userId} ,  saved`));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
