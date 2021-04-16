import nc from "next-connect";
import SendResponse from "api-utils/SendResponse";
import { encryptData } from "api-utils/auth";
import { userDataIfExists } from 'database-utils/user';

// Global class decalaration
const sendAPIResponse = new SendResponse();

const logInUser = async (req, res) => {
  const { email } = req.body;

  const userData = await userDataIfExists(email);

  if (userData) {
    sendAPIResponse.sendSuccessResponse({
      res,
      message: "User logged in successfully.",
      payload: {
        id: encryptData(userData.id),
      },
    });
    return;
  }

  sendAPIResponse.sendErrorResponse({
    res,
    error: "No user found with this email. Try signing up",
  });
};

const logInUserHandler = nc().post(logInUser);

export default logInUserHandler;
