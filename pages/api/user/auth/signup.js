import nc from "next-connect";
import UserProfileModel from "models/user";
import SendResponse from "api-utils/SendResponse";
import { userDataIfExists, addUserToUserTable } from "database-utils/user";

// Global class decalaration
const sendAPIResponse = new SendResponse();

const signUpWithGoogle = async (req, res) => {
  const { name, email, imageUrl, signUpWith } = req.body;

  // 0. Check if user has submitted correct data
  if (!name || !email || !imageUrl || !signUpWith) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please provide correct details",
    });
    return;
  }

  const userData = await userDataIfExists(email);

  if (userData) {
    sendAPIResponse.sendErrorResponse({
      res,
      error: "Email already exists. Try logging in",
    });
    return;
  }

  const userProfileModelData = userProfileModel(
    name,
    email,
    imageUrl,
    signUpWith
  );

  await addUserToUserTable(userProfileModelData)
    .then((userData) => {
      sendAPIResponse.sendSuccessResponse({
        res,
        message: "User signed up successfully.",
        payload: userData,
      });
    })
    .catch((error) => {
      sendAPIResponse.sendErrorResponse({
        res,
        error,
      });
    });
};

const signUpUserWithGoogleHandler = nc().post(signUpWithGoogle);

export default signUpUserWithGoogleHandler;
