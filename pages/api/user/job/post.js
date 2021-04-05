import nc from "next-connect";
import UserDatabseModule from "../../../../models/database-modules/user";
import UserJobModel from "../../../../models/job";
import SendResponse from "../../../../api-utils/SendResponse";

// Global class decalaration
const sendAPIResponse = new SendResponse();
const userDatabseModule = new UserDatabseModule();

const publishJob = async (req, res) => {
  const { mainText, hyperLink } = req.body;

  // 0. Check if user has submitted correct data
  if (!mainText) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please enter your job text",
    });
    return;
  }

  if (!hyperLink) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please enter your hyperLink",
    });
    return;
  }

  const userJobModel = new UserJobModel(mainText, hyperLink);

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
      console.log(error);
    });
};

const publishJobAdminHandler = nc().post(publishJob);

export default publishJobAdminHandler;
