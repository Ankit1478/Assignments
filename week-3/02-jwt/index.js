const express = require("express");
const jwt = require("jsonwebtoken");
const jwtpassword = "123456";

const app = express();
app.use(express.json());

const ALL_USER = [
  {
    username: "ankit@gmail.com",
    password: "123",
    name: "ankit raj",
  },
  {
    username: "kundan@gmail.com",
    password: "123",
    name: "kundan raj",
  },
  {
    username: "nidhi@gmail.com",
    password: "123",
    name: "nidhi raj",
  },
];

function userExsis(username, password) {
  // write loic is user Exists or not
  for (let i = 0; i < ALL_USER.length; i++) {
    if (ALL_USER[i].username == username && ALL_USER[i].password == password) {
      return true;
    }
  }
  return false;
}

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExsis(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exists in my Db",
    });
  }
  //else

  var token = jwt.sign({ username: username }, jwtpassword);
  return res.json({
    token,
  });
});

app.get("/user", (req, res) => {
  const token = req.headers.authorization;
  try {
    const decode = jwt.verify(token, jwtpassword);
    const username = decode.username;
    res.json({
      //user: username,
      user: ALL_USER.filter(function (value) {
        if (value == username) {
          return false;
        }
        return true;
      }),
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000);
