const { v4: uuidv4 } = require("uuid");

export const userProfileModel = (name, email, imageUrl, signUpWith) => {
  return {
    id: uuidv4(),
    name: name,
    email: email,
    imageUrl: imageUrl,
    signUpWith: signUpWith,
    joinedOn: new Date(Date.now()),
  };
};
