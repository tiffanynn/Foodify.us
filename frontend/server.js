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

  //Legacy Temporary DB JSON Object
  //res.send(recipeListData);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//LEGACY RECIPE DB FOR DEVELOPMENT
/*
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
*/
