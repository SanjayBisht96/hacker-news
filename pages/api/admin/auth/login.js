import nc from "next-connect";
import AdminDatabseModule from "../../../../models/database-modules/admin";
import SendResponse from "../../../../api-utils/SendResponse";
import { comparePasswordForHashing } from "../../../../api-utils/auth";

// Global class decalaration
const sendAPIResponse = new SendResponse();
const adminDatabseModule = new AdminDatabseModule();

const login = async (req, res) => {
  const { adminName, password } = req.body;

  // 0. Check if admin has submitted correct data
  if (!adminName) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please enter your adminName",
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

  // Check if admin already exists
  const adminDataIfExists = await adminDatabseModule.adminDataIfExists(adminName);

  // If adminname does not already exists
  if (!adminDataIfExists) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "No admin found. Please check again.",
    });
    return;
  }

  const isAdminPasswordCorrect = await comparePasswordForHashing(
    password,
    adminDataIfExists.password
  );

  if (isAdminPasswordCorrect) {
    delete adminDataIfExists.password;
    delete adminDataIfExists.joinedOn;

    sendAPIResponse.sendSuccessResponse({
      res,
      message: "Admin logged in successfully.",
      payload: adminDataIfExists,
    });

    return;
  }

  sendAPIResponse.sendErrorResponse({
    res,
    message: "Your admin name or password is wrong. Please check again.",
  });
};

const logInAdminHandler = nc().post(login);

export default logInAdminHandler;