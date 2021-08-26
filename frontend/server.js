const express = require("express");

//idk why but it works
const cors = require("cors");

const mongoose = require("mongoose");

// MONGODB CREDENTIALS
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000; //Runs LocalHost Server on Port 5000

app.use(cors());
app.use(express.json());

//MONGODB CONNECTION CODE, NEED URI SAVED TO .ENV FOR CONNECTION
/*
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

*/

//SERVER API REQUESTS FROM OTHER FILES:
const mainRouter = require("./backend/routes/mainRouter");
//app.use("/REPLACE ME WITH A SINGLE ROUTE", mainRouter);

app.get((req, res) => {
  res.send("HELLO WORLD FROM FOODIFY SERVER");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
