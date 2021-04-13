const { v4: uuidv4 } = require("uuid");

class AdminProfileModel {
  constructor(email, password) {
    this.id = uuidv4();
    this.email = email;
    this.password = password;
    this.joinedOn = new Date(Date.now());
  }
}

module.exports = AdminProfileModel;
