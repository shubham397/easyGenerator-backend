const port = 1234;
const bodyParser = require("body-parser");
const hbs = require("hbs");
const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/user");

var app = express();
app.set("view engine", "hbs");

mongoose.connect(
  "mongodb+srv://shubham397:shubham1994@cluster0.r0opdcx.mongodb.net/test"
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", users);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
