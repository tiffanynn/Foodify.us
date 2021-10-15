const express = require("express");

//idk why but it works
const cors = require("cors");

const mongoose = require("mongoose");
const Recipe = require("./backend/recipeModel");

// MONGODB CREDENTIALS
const dotenv = require("dotenv");
//require("dotenv").config();
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; //Runs LocalHost Server on Port 5000

app.use(cors());
app.use(express.json());

//const cluster = "<cluster name>";
//const dbname = "myFirstDatabase";

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

/**************** RECIPE/FEED/SEARCH RELATED ROUTES: ***************/
//Notes:
// Req.params will contain url slashes
//SERVER API GET REQUEST EXAMPLE:
app.route("/").get((req, res) => {
  res.send("Hello World From Foodify Backend Server! :)");
});

// SENDS BACK ALL RECIPES IN DB
app.route("/feed").get((req, res) => {
  console.log("INCOMING FEED REQUEST");
  //res.json({ feedExampleData: "hi", example2: "bye" });

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
  //res.json({ feedExampleData: "hi", example2: "bye" });
  var recipeID = req.params.recipeID;

  /* QUERIES DB BY RECIPE ID */
  Recipe.find({ _id: recipeID })
    .then((recipe) =>
      res.send(JSON.parse('{"recipe" : ' + JSON.stringify(recipe) + "}"))
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

/**************** USER/PROFILE RELATED ROUTES: ***************/

//USER SIGNUP, ADDS USER TO USER DB
// SENDS BACK 1 RECIPE DATA CORRESPONDING TO RECIPE ID
app.route("/usersignup/:userID/:name").get((req, res) => {
  var userID = req.params.userID;
  var name = req.params.name;

  if (userID == null) {
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
    req.params.userID,
    "/",
    req.params.name
  );

  /* ENTERS NEW USER IN USERS DB */
  /*
  Recipe.find({ _id: recipeID })
    .then((recipe) =>
      res.send(JSON.parse('{"recipe" : ' + JSON.stringify(recipe) + "}"))
    )
    .catch((err) => res.status(400).json("Error: " + err)); */
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
