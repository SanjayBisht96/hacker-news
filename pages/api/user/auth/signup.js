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

const signup = async (req, res) => {
  const { userName, password } = req.body;

  // 0. Check if user has submitted correct data
  if (!userName) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please enter your userName",
    });
    return;
  }

  if (!password) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please enter your password",
    });
    return;
  }

  // Check if username already exists
  const userDataIfExists = await userDatabseModule.userDataIfExists(userName);

  // If username already exists
  if (userDataIfExists) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Username already exists. Please choose another.",
    });
    return;
  }

  const payload = { userName };

  const [accessToken, refreshToken] = getAuthTokens(payload);

  const hashedPassword = await createBycryptHashForPassword(password);

  const userProfileModel = new UserProfileModel(
    userName,
    hashedPassword,
    accessToken,
    refreshToken
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

const signUpUserHandler = nc().post(signup);

export default signUpUserHandler;
