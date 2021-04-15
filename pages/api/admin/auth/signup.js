import nc from "next-connect";
import { adminDataIfExists, addAdminToAdminTable } from "database-utils/admin";
import { adminProfileModel } from "models/admin";
import SendResponse from "api-utils/SendResponse";
import { createBycryptHashForPassword } from "api-utils/auth";

// Global class decalaration
const sendAPIResponse = new SendResponse();

const signup = async (req, res) => {
  const { email, password } = req.body;

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

  // Check if adminname already exists
  const adminDataIfExistsData = await adminDataIfExists(email);

  // If adminname already exists
  if (adminDataIfExistsData) {
    sendAPIResponse.sendErrorResponse({
      res,
      error: "Admin already exists with same name. Please choose another.",
    });
    return;
  }

  const hashedPassword = await createBycryptHashForPassword(password);

  const adminProfileModelData = adminProfileModel(email, hashedPassword);

  await addAdminToAdminTable(adminProfileModelData)
    .then((adminData) => {
      sendAPIResponse.sendSuccessResponse({
        res,
        message: "Admin signed up successfully.",
        payload: adminData,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const signUpAdminHandler = nc().post(signup);

export default signUpAdminHandler;
