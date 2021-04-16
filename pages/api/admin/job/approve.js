import nc from "next-connect";
import { getAJobByID } from "database-utils/user";
import SendResponse from "api-utils/SendResponse";

// Global class decalaration
const sendAPIResponse = new SendResponse();

const approveJob = async (req, res) => {
  const { jobId } = req.body;

  // 0. Check if user has submitted correct data
  if (!jobId) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please enter your job ID",
    });
    return;
  }

  getAJobByID(jobId)
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

const postApproveJobHandler = nc().post(approveJob);

export default postApproveJobHandler;
