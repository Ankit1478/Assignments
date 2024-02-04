const assert = require("assert");
const express = require("express");

const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

let requestCount = 0;

function countMiddleware(req, res, next) {
  requestCount++;
  next();
}

app.use(countMiddleware);

app.get("/user", function (req, res) {
  console.log(requestCount);
  res.status(200).json({ requestCount });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.get("/requestCount", function (req, res) {
  res.status(200).json({ requestCount });
});

app.listen(6060);
