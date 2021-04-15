import nc from "next-connect";
import { getAJobByID } from "database-utils/user";
import SendResponse from "api-utils/SendResponse";

// Global class decalaration
const sendAPIResponse = new SendResponse();

const getJob = async (req, res) => {
  const { jobId } = req.query;

  // 0. Check if user has submitted correct data
  if (!jobId) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please enter your job ID",
    });
    return;
  }

  await getAJobByID(jobId)
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

const getJobAdminHandler = nc().get(getJob);

export default getJobAdminHandler;
