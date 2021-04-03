const { v4: uuidv4 } = require("uuid");

class UserProfileModel {
  constructor(userName, password, accessToken, refreshToken) {
    this.id = uuidv4();
    this.userName = userName;
    this.password = password;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.joinedOn = new Date(Date.now());
  }
}

module.exports = UserProfileModel;
