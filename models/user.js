class UserProfileModel {
  constructor(id, name, email, imageUrl, accessToken, signUpWith) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.imageUrl = imageUrl;
    this.accessToken = accessToken;
    this.signUpWith = signUpWith;
    this.joinedOn = new Date(Date.now());
  }
}

module.exports = UserProfileModel;
