const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cryptr = require("cryptr");

// Get auth token => accessToken & refreshToken
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

// Encrypt Data using Cryptr
export const encryptData = (data) => {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  return cryptr.encrypt(data);
};

// Decrypt Data using Cryptr
export const decryptData = (hash) => {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  return cryptr.decrypt(hash);
};

// Compare password for hashing
export const comparePasswordForHashing = async (password, hashedPassword) => {
  return bcrypt
    .compare(password, hashedPassword)
    .then((isPasswordMatched) => isPasswordMatched);
};
