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
app.use(express.json({ limit: "200mb" }));

//maybe helps parsing params issues
app.set("query parser", "extended");

/*
 *
 *
 *
 */
/** AWS setup */
// Import required AWS SDK clients and commands for Node.js
const {
  S3Client,
  PutObjectCommand,
  ListBucketsCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

// Set the AWS region
const REGION = "us-west-1";

// Set the bucket parameters
const bucketName = "foodify";
const bucketParams = { Bucket: bucketName };

const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: "us-west-1",
});
let aws3 = new AWS.S3({ params: { Bucket: bucketName } });

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

app.route("/upload").post(async (req, res) => {
  console.log("INCOMING RECIPE IMAGE UPLOAD REQUEST");

  const title = req.body.title;
  const prepTime = req.body.estimatedTime;
  const selectedTags = req.body.selectedTags;
  const hashtag = req.body.hashtag;
  const ingredient = req.body.ingredient;
  const description = req.body.description;
  const date_ob = new Date();
  const date = date_ob.toISOString();
  const ID = req.body.userName.uid;
  const JSON = {
    title: title,
    hashTagList: hashtag,
    postDate: date,
    estimatedTime: prepTime,
    ingredientList: ingredient,
    dietTagList: selectedTags,
    story: description,
    userName: ID,
  };

  const filetype = req.body.filetype;

  const content = Buffer.from(req.body.data, "base64");

  const fileName = "recipe_pics/" + ID + "/" + date + ".jpeg";
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: content,
    ContentType: filetype,
  };
  try {
    const results = new AWS.S3.ManagedUpload({ params: params });
    var s3Url;
    results.send(async function (err, data) {
      s3Url = data.Location;
      // console.log(s3Url)
      JSON["imgUrl"] = s3Url;
      const collection = db.collection("recipes");
      const insertResult = await collection.insertOne(JSON);
      return res.json({ s3Url: data.Location, uploadDate: date });
    });
    console.log("Successfully uploaded data to S3");
  } catch (err) {
    console.log("Error", err);
  }
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

//Retrieved from example on StackOverflow: https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
const groupParamsByKey = (params) =>
  [...params.entries()].reduce((acc, tuple) => {
    // getting the key and value from each tuple
    const [key, val] = tuple;
    if (acc.hasOwnProperty(key)) {
      // if the current key is already an array, we'll add the value to it
      if (Array.isArray(acc[key])) {
        acc[key] = [...acc[key], val];
      } else {
        // if it's not an array, but contains a value, we'll convert it into an array
        // and add the current value to it
        acc[key] = [acc[key], val];
      }
    } else {
      // plain assignment if no special case is present
      acc[key] = val;
    }

    return acc;
  }, {});

function paramsToObject(entries) {
  const result = {};
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}

//SENDS BACK ALL RECIPES MATCHING SEARCH OR HASHTAG
app.route("/search/:filter").get((req, res) => {
  console.log("REQ PARAMS: ", req.params.filter);
  let urlParams = new URLSearchParams(req.params.filter);
  console.log("URL PARAMS: ", urlParams);

  //get parameters as key value pairs
  for (var param of urlParams.entries()) {
    //console.log("\nkey: " + param[0] + "     value: " + param[1]);
  }

  //compile parameters into json object:
  const result = {};
  for (var param of urlParams.entries()) {
    // each 'entry' is a [key, value] tupple
    result[param[0]] = param[1];
  }

  console.log("FINAL RESULT OBJECT: ", result);

  //Identifies if query is hashtag search or normal search
  let filter = req.params.filter;
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

//GET 1 USER BY USERID
app.route("/user/:userid").get((req, res) => {
  console.log("INCOMING REQUEST FOR USER WITH USERID: ", req.params.userid);
  var queryUserId = req.params.userid;

  console.log(queryUserId);
  //QUERY DB FOR USER ID DATA:
  User.find({ userId: queryUserId })
    .then((user) =>
      res.send(JSON.parse('{"user" : ' + JSON.stringify(user) + "}"))
    )
    .catch((err) => res.status(400).json("User Query Error: " + err));
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
