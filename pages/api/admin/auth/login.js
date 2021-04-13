import nc from "next-connect";
import AdminDatabseModule from "../../../../models/database-modules/admin";
import SendResponse from "../../../../api-utils/SendResponse";
import {
  comparePasswordForHashing,
  encryptData,
} from "../../../../api-utils/auth";

// Global class decalaration
const sendAPIResponse = new SendResponse();
const adminDatabseModule = new AdminDatabseModule();

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  // 0. Check if admin has submitted correct data
  if (!email) {
    sendAPIResponse.sendErrorResponse({
      res,
      error: "Please enter your email",
    });
    return;
  }

  if (!password) {
    sendAPIResponse.sendErrorResponse({
      res,
      error: "Please enter your password",
    });
    return;
  }

  // Check if admin already exists
  const adminDataIfExists = await adminDatabseModule.adminDataIfExists(email);

  // If adminname does not already exists
  if (!adminDataIfExists) {
    sendAPIResponse.sendErrorResponse({
      res,
      error: "No admin found. Please check again.",
    });
    return;
  }

  const isAdminPasswordCorrect = await comparePasswordForHashing(
    password,
    adminDataIfExists.password
  );

  if (isAdminPasswordCorrect) {
    const adminId = encryptData(adminDataIfExists.id);

    sendAPIResponse.sendSuccessResponse({
      res,
      error: "Admin logged in successfully.",
      payload: { adminId },
    });
    return;
  }

  sendAPIResponse.sendErrorResponse({
    res,
    error: "Your admin name or password is wrong. Please check again.",
  });
};

const logInAdminHandler = nc().post(login);

export default logInAdminHandler;
