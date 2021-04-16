import nc from "next-connect";
import { userProfileModel } from "models/user";
import SendResponse from "api-utils/SendResponse";
import { userDataIfExists, addUserToUserTable } from "database-utils/user";
import { encryptData } from "api-utils/auth";

// Global class decalaration
const sendAPIResponse = new SendResponse();

const signUpUser = async (req, res) => {
  const { name, email, imageUrl, signUpWith } = req.body;

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

  addUserToUserTable(userProfileModelData)
    .then((userData) => {
      const hasedId = encryptData(userData.id);

      sendAPIResponse.sendSuccessResponse({
        res,
        message: "User signed up successfully.",
        payload: { id: hasedId },
      });
    })
    .catch((error) => {
      sendAPIResponse.sendErrorResponse({
        res,
        error,
      });
    });
};

const signUpUserHandler = nc().post(signUpUser);

export default signUpUserHandler;
