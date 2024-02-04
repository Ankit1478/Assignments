const jwt = require("jsonwebtoken");
const { scret } = require("../config");
function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  // Bearer aasshnkidfnhoresddbjcbj
  const word = token.split(" ");
  const jwtToken = word[1]; //aasshnkidfnhoresddbjcbj
  const decodeValue = jwt.verify(jwtToken, scret);
  if (decodeValue.username) {
    req.username = decodeValue.username;
    next();
  } else {
    res.status(403).json({
      Msg: "wrong user",
    });
  }
}

module.exports = userMiddleware;
