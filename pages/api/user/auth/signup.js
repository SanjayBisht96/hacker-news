import nc from "next-connect";
import { userProfileModel } from "models/user";
import { userDataIfExists, addUserToUserTable } from "database-utils/user";
import { encryptData } from "api-utils/auth";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";

const signUpUser = async (req, res) => {
  const { name, email, imageUrl, signUpWith } = req.body;

  const userData = await userDataIfExists(email);

  if (userData) {
    sendErrorResponse({
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

      sendSuccessResponse({
        res,
        message: "User signed up successfully.",
        payload: { id: hasedId },
      });
    })
    .catch((error) => {
      console.log(error)
      sendErrorResponse({
        res,
        error: 'Something went wrong',
      });
    });
};

const signUpUserHandler = nc().post(signUpUser);

export default signUpUserHandler;
