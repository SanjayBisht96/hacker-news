import nc from "next-connect";
import UserDatabseModule from "../../../../models/database-modules/user";
import UserJobModel from "../../../../models/job";
import SendResponse from "../../../../api-utils/SendResponse";

// Global class decalaration
const sendAPIResponse = new SendResponse();
const userDatabseModule = new UserDatabseModule();

const publishJob = async (req, res) => {
  const { jobTitle, jobDescription, jobURL } = req.body;

  // 0. Check if user has submitted correct data
  if (!jobTitle) {
    sendAPIResponse.sendErrorResponse({
      res,
      error: "Please enter your job text",
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

  const userJobModel = new UserJobModel(jobTitle, jobDescription, jobURL);

  await userDatabseModule
    .postAJobForReview(userJobModel)
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
