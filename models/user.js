const { v4: uuidv4 } = require("uuid");

export const userProfileModel = (name, email, imageUrl, signUpWith) => {
  return {
    name: name,
    email: email,
    imageUrl: imageUrl,
    signUpWith: signUpWith,
    joinedOn: new Date(Date.now()),
  };
};

export const userJobModel = (userId, jobTitle, jobDescription, jobURL) => {
  return {
    id: uuidv4(),
    userId: userId,
    jobTitle: jobTitle,
    jobDescription: jobDescription,
    jobURL: jobURL,
    isActive: false,
    postedOn: new Date(Date.now()),
  };
};
