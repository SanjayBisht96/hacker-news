import SendResponse from "../../../api-utils/SendResponse";

// Global class decalaration
const sendAPIResponse = new SendResponse();

const login = async (req, res) => {
  sendAPIResponse.sendSuccessResponse({
    res,
    message: "User logged-in successfully. TESTING",
  });
};

export default login;
