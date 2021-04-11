const { v4: uuidv4 } = require("uuid");

class UserProfileModel {
  constructor(name, email, imageUrl, signUpWith) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.imageUrl = imageUrl;
    this.signUpWith = signUpWith;
    this.joinedOn = new Date(Date.now());
  }
}

module.exports = UserProfileModel;
