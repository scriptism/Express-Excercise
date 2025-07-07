let express = require("express");
let app = express();

// npm i nodemon -D
// "dev": "nodemon server.js"

// Challenge 1: console.log
console.log("Hello World");

// Challenge 2: send Hello Express
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// Challenge 3: serve html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Challenge 4: serve styles, the middleware express.static(path)
app.use("/public", express.static(__dirname + "/public"));

// Challenge 5:a simple API by creating a route that responds with JSON
app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
});

// Challenge 6: access .env File via process.env
//require dotenv

require("dotenv").config();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if (process.env["MESSAGE_STYLE"] == "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// Challenge 7: Implement a Root-Level Request Logger Middleware

require("dotenv").config();

// Serve static files first
app.use("/public", express.static(__dirname + "/public"));

// Logger middleware - must come before routes
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Route handlers
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

// Challenge 8: Chain Middleware to Time server

// require("dotenv").config();
// console.log("Hello World");
// Serve static files first
app.use("/public", express.static(__dirname + "/public"));

// Logger middleware - must come before routes
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Route handlers
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);
module.exports = app;

// Challenge 9: Get Route Parameter from the client

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});
module.exports = app;

// Challenge 10: Get Query Parameter input from the client
app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

// Challenge 11: Use body-parser to Parse POSt Request

let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// Challenge 12: Get Data from  POST Request
app.post("/name", (req, res) => {
  res.json({ name: req.body.first + " " + req.body.last });
});

module.exports = app;
