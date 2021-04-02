import nc from "next-connect";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
import UserDatabseModule from "../../../../models/database-modules/user";
import SendResponse from "../../../../api-utils/SendResponse";

// Global class decalaration
const sendAPIResponse = new SendResponse();
const userDatabseModule = new UserDatabseModule();

const signup = async (req, res) => {
  const { userName, password } = req.body;

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

  sendAPIResponse.sendSuccessResponse({
    res,
    message: "User added successfully. TESTING",
  });
};

const signUpUserHandler = nc().post(signup);

export default signUpUserHandler;
