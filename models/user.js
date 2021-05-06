//const { v4: uuidv4 } = require("uuid");

export const userProfileModel = (name, email, imageUrl, signUpWith) => {
  return {
    name: name,
    email: email,
    imageUrl: imageUrl,
    signUpWith: signUpWith,
    joinedOn: new Date(Date.now()),
  };
};

export const userLinkPostModel = (userId, title, url, tags) => {
  return {
    userId,
    title,
    url,
    tags,
  };
};

export const userAskPostModel = (userId, title, text, tags) => {
  return {
    userId,
    title,
    text,
    tags,
  };
};

export const userLinkPostTagModel = (askId, tagId) => {
  return {
    askId,
    tagId,
  };
};

export const userAskPostTagModel = (askId, tagId) => {
  return {
    askId,
    tagId,
  };
};

export const userTagModel = (name) => {
  return {
    name,
  };
};

export const userJobModel = (userId, jobTitle, jobDescription, jobURL) => {
  return {
    //id: uuidv4(),
    userId: userId,
    jobTitle: jobTitle,
    jobDescription: jobDescription,
    jobURL: jobURL,
    isActive: false,
    postedOn: new Date(Date.now()),
  };
};
