import nc from "next-connect";
import { adminDataIfExists } from "database-utils/admin";
import { comparePasswordForHashing, encryptData } from "api-utils/auth";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";

const logInAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Check if admin already exists
  const adminDataIfExistsData = await adminDataIfExists(email);

  // If adminname does not already exists
  if (!adminDataIfExistsData) {
    sendErrorResponse({
      res,
      error: "No admin found. Please check again.",
    });
    return;
  }

  const isAdminPasswordCorrect = await comparePasswordForHashing(
    password,
    adminDataIfExistsData.password
  );

  if (isAdminPasswordCorrect) {
    const adminId = encryptData(adminDataIfExistsData.id);

    sendSuccessResponse({
      res,
      error: "Admin logged in successfully.",
      payload: { adminId },
    });
    return;
  }

  sendErrorResponse({
    res,
    error: "Your admin name or password is wrong. Please check again.",
  });
};

const logInAdminHandler = nc().post(logInAdmin);

export default logInAdminHandler;
