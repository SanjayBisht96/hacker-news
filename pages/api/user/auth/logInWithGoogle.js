import nc from "next-connect";
import UserDatabseModule from "../../../../models/database-modules/user";
import SendResponse from "../../../../api-utils/SendResponse";

// Global class decalaration
const sendAPIResponse = new SendResponse();
const userDatabseModule = new UserDatabseModule();

const logInWithGoogle = async (req, res) => {
  const { email } = req.body;

  // 0. Check if user has submitted correct data
  if (!email) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please provide correct details",
    });
    return;
  }

  const userData = await userDatabseModule.userDataIfExists(email);

  if (userData) {
    sendAPIResponse.sendSuccessResponse({
      res,
      message: "User logged in successfully.",
      payload: userData,
    });
    return;
  }

  sendAPIResponse.sendErrorResponse({
    res,
    error: "No user found with this email. Try signing up",
  });
};

const logInUserWithGoogleHandler = nc().post(logInWithGoogle);

export default logInUserWithGoogleHandler;
