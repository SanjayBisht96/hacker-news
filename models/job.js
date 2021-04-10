const { v4: uuidv4 } = require("uuid");

class UserJobModel {
  constructor(jobTitle, jobDescription, jobURL) {
    this.id = uuidv4();
    this.jobTitle = jobTitle;
    this.jobDescription = jobDescription;
    this.jobURL = jobURL;
    this.isActive = false;
    this.postedOn = new Date(Date.now());
  }
}

module.exports = UserJobModel;
