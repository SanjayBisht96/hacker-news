const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cryptr = require("cryptr");

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

export const encryptData = (data) => {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  return cryptr.encrypt(data);
};

export const decryptData = (hash) => {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  return cryptr.decrypt(hash);
};

export const comparePasswordForHashing = async (password, hashedPassword) => {
  return bcrypt
    .compare(password, hashedPassword)
    .then((isPasswordMatched) => isPasswordMatched);
};
