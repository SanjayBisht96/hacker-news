const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const getAuthTokens = (payload) => {
  // Generate Access Token
  let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  // Generate Refresh Token
  let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

  return [accessToken, refreshToken];
};

export const createBycryptHashForPassword = async (password) => {
  return bcrypt.hash(password, 10).then((value) => value);
};

export const comparePasswordForHashing = async (password, hashedPassword) => {
  return bcrypt
    .compare(password, hashedPassword)
    .then((isPasswordMatched) => isPasswordMatched);
};
