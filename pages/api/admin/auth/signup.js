import nc from "next-connect";
import { adminDataIfExists, addAdminToAdminTable } from "database-utils/admin";
import { adminProfileModel } from "models/admin";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { createBycryptHashForPassword } from "api-utils/auth";
import { encryptData } from "api-utils/auth";

const signUpAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Check if adminname already exists
  const adminDataIfExistsData = await adminDataIfExists(email);

  // If adminname already exists
  if (adminDataIfExistsData) {
    sendErrorResponse({
      res,
      error: "Admin already exists with same email. Please choose another.",
    });
    return;
  }

  const hashedPassword = await createBycryptHashForPassword(password);

  const adminProfileModelData = adminProfileModel(email, hashedPassword);

  addAdminToAdminTable(adminProfileModelData)
    .then((adminData) => {
      const hasedId = encryptData(adminData.id);

      sendSuccessResponse({
        res,
        message: "Admin signed up successfully.",
        payload: { adminId: hasedId },
      });
    })
    .catch((error) => {
      sendErrorResponse({
        res,
        error,
      });
    });
};

const signUpAdminHandler = nc().post(signUpAdmin);

export default signUpAdminHandler;
