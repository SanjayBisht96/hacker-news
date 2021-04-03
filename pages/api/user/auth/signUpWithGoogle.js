import nc from "next-connect";
import UserDatabseModule from "../../../../models/database-modules/user";
import UserProfileModel from "../../../../models/user";
import SendResponse from "../../../../api-utils/SendResponse";
import {
  getAuthTokens,
  createBycryptHashForPassword,
} from "../../../../api-utils/auth";

// Global class decalaration
const sendAPIResponse = new SendResponse();
const userDatabseModule = new UserDatabseModule();

const signUpWithGoogle = async (req, res) => {
  const { id, name, email, imageUrl, accessToken, signUpWith } = req.body;

  // 0. Check if user has submitted correct data
  if (!id || !name || !email || !imageUrl || !accessToken || !signUpWith) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please provide correct details",
    });
    return;
  }

  const userProfileModel = new UserProfileModel(
    id,
    name,
    email,
    imageUrl,
    accessToken,
    signUpWith,
  );

  await userDatabseModule
    .addUserToUserTable(userProfileModel)
    .then((userData) => {
      sendAPIResponse.sendSuccessResponse({
        res,
        message: "User signed up successfully.",
        payload: userData,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const signUpUserWithGoogleHandler = nc().post(signUpWithGoogle);

export default signUpUserWithGoogleHandler;
