const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const zod = require("zod");
const jwtPassword = "secret";

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function sign(username, password) {
  const usernameRes = emailSchema.safeParse(username);
  const passwordRes = passwordSchema.safeParse(password);
  if (!usernameRes.success || !passwordRes.success) {
    return null;
  }

  const signature = jwt.sign(
    {
      username,
    },
    jwtPassword
  );
  return signature;
}

//verift

function verifyJwt(token) {
  try {
    const verified = jwt.verify(token, jwtPassword);
    if (verified) {
      return true;
    }
  } catch {
    return false;
  }
}

//decoddee
function decode(token) {
  const decode = jwt.decode(token);
  if (decode) return true;
  return false;
}

const ans = sign("ankit123@gmail.com", "123456");
console.log(ans);

console.log(
  decode(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFua2l0MTIzQGdtYWlsLmNvbSIsImlhdCI6MTcwNDgyODM4MX0.iNBrM-k5S22_VlDUTCYF8514zDQ964cXIJU38kBO-Wk"
  )
);

console.log(
  verifyJwt(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFua2l0MTIzQGdtYWlsLmNvbSIsImlhdCI6MTcwNDgyODM4MX0.iNBrM-k5S22_VlDUTCYF8514zDQ964cXIJU38kBO-Wk"
  )
);
