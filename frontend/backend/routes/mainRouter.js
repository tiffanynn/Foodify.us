const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("Hello World From Foodify Backend Server :)");
});
