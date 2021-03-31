import SendResponse from "../../../api-utils/SendResponse";

// Global class decalaration
const sendAPIResponse = new SendResponse();

const signup = async (req, res) => {
  sendAPIResponse.sendSuccessResponse({
    res,
    message: "User added successfully. TESTING",
  });
};

export default signup;
