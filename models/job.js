const { v4: uuidv4 } = require("uuid");

class UserJobModel {
  constructor(mainText, hyperLink) {
    this.id = uuidv4();
    this.mainText = mainText;
    this.hyperLink = hyperLink;
    this.isActive = false;
    this.postedOn = new Date(Date.now());
  }
}

module.exports = UserJobModel;
