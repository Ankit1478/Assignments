const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const word = token.split(" ");
  const jwtToken = word[1];
  const decodeValue = jwt.verify(jwtToken, JWT_SECRET);
  if (decodeValue.username) {
    next();
  } else {
    res.status(403).json({
      msg: "You are not authenticated",
    });
  }
}

module.exports = adminMiddleware;
