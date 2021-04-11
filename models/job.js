const { v4: uuidv4 } = require("uuid");

class UserJobModel {
  constructor(userId, jobTitle, jobDescription, jobURL) {
    this.id = uuidv4();
    this.userId = userId;
    this.jobTitle = jobTitle;
    this.jobDescription = jobDescription;
    this.jobURL = jobURL;
    this.isActive = false;
    this.postedOn = new Date(Date.now());
  }
}

module.exports = UserJobModel;
