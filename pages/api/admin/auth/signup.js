import nc from "next-connect";
import AdminDatabseModule from "../../../../models/database-modules/admin";
import AdminProfileModel from "../../../../models/admin";
import SendResponse from "../../../../api-utils/SendResponse";
import { createBycryptHashForPassword } from "../../../../api-utils/auth";

// Global class decalaration
const sendAPIResponse = new SendResponse();
const adminDatabseModule = new AdminDatabseModule();

const signup = async (req, res) => {
  const { email, password } = req.body;

  // 0. Check if admin has submitted correct data
  if (!email) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please enter your email",
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

  // Check if adminname already exists
  const adminDataIfExists = await adminDatabseModule.adminDataIfExists(
    email
  );
  
  // If adminname already exists
  if (adminDataIfExists) {
    sendAPIResponse.sendErrorResponse({
      res,
      error: "Admin already exists with same name. Please choose another.",
    });
    return;
  }

  const hashedPassword = await createBycryptHashForPassword(password);

  const adminProfileModel = new AdminProfileModel(email, hashedPassword);

  await adminDatabseModule
    .addAdminToAdminTable(adminProfileModel)
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
