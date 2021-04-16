import nc from "next-connect";
import { userJobModel } from "models/user";
import SendResponse from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { postAJobForReview } from "database-utils/user";

// Global class decalaration
const sendAPIResponse = new SendResponse();

const publishJob = async (req, res) => {
  const { userId, jobTitle, jobDescription, jobURL } = req.body;

  // 0. Check if user has submitted correct data
  if (!jobTitle) {
    sendAPIResponse.sendErrorResponse({
      res,
      error: "Please enter your job title",
    });
    return;
  }

  if (!jobDescription) {
    sendAPIResponse.sendErrorResponse({
      res,
      error: "Please enter your job description",
    });
    return;
  }

  if (!jobURL) {
    sendAPIResponse.sendErrorResponse({
      res,
      error: "Please enter your job URL",
    });
    return;
  }

  const decryptedUserId = decryptData(userId);

  const userJobModelData = userJobModel(
    decryptedUserId,
    jobTitle,
    jobDescription,
    jobURL
  );

  await postAJobForReview(userJobModelData)
    .then((jobData) => {
      sendAPIResponse.sendSuccessResponse({
        res,
        message: "Your job post has been sent for review.",
        payload: jobData,
      });
    })
    .catch((error) => {
      sendAPIResponse.sendErrorResponse({
        res,
        error,
      });
    });
};

const publishJobAdminHandler = nc().post(publishJob);

export default publishJobAdminHandler;
