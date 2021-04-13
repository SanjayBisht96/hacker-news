const { v4: uuidv4 } = require("uuid");

export const adminProfileModel = (email, password) => {
  return {
    id: uuidv4(),
    email: email,
    password: password,
  };
};
