const { v4: uuidv4 } = require("uuid");

class AdminProfileModel {
  constructor(adminName, password) {
    this.id = uuidv4();
    this.adminName = adminName;
    this.password = password;
    this.joinedOn = new Date(Date.now());
  }
}

module.exports = AdminProfileModel;
