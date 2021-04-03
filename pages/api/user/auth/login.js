import nc from "next-connect";
import UserDatabseModule from "../../../../models/database-modules/user";
import SendResponse from "../../../../api-utils/SendResponse";
import { comparePasswordForHashing } from "../../../../api-utils/auth";

// Global class decalaration
const sendAPIResponse = new SendResponse();
const userDatabseModule = new UserDatabseModule();

const login = async (req, res) => {
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

  // Check if user already exists
  const userDataIfExists = await userDatabseModule.userDataIfExists(userName);

  // If username does not already exists
  if (!userDataIfExists) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "No user found. Please check again.",
    });
    return;
  }

  const isUserPasswordCorrect = await comparePasswordForHashing(
    password,
    userDataIfExists.password
  );

  if (isUserPasswordCorrect) {
    delete userDataIfExists.password;
    delete userDataIfExists.joinedOn;

    sendAPIResponse.sendSuccessResponse({
      res,
      message: "User logged in successfully.",
      payload: userDataIfExists,
    });

    return;
  }

  sendAPIResponse.sendErrorResponse({
    res,
    message: "Your username or password is wrong. Please check again.",
  });
};

const logInUserHandler = nc().post(login);

export default logInUserHandler;
