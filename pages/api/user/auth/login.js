import nc from "next-connect";
import { encryptData } from "api-utils/auth";
import { userDataIfExists } from "database-utils/user";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";

const logInUser = async (req, res) => {
  const { email } = req.body;

  const userData = await userDataIfExists(email);

  if (userData) {
    sendSuccessResponse({
      res,
      message: "User logged in successfully.",
      payload: {
        id: encryptData(userData.id),
      },
    });
    return;
  }

  sendErrorResponse({
    res,
    error: "No user found with this email. Try signing up",
  });
};

const logInUserHandler = nc().post(logInUser);

export default logInUserHandler;
