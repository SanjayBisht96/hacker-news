import nc from "next-connect";
import UserDatabseModule from "../../../../models/database-modules/user";
import SendResponse from "../../../../api-utils/SendResponse";

// Global class decalaration
const sendAPIResponse = new SendResponse();
const userDatabseModule = new UserDatabseModule();

const getJob = async (req, res) => {
  const { jobId } = req.query;
  console.log(jobId)

  // 0. Check if user has submitted correct data
  if (!jobId) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Please enter your job ID",
    });
    return;
  }

  await userDatabseModule
    .getAJobByID(jobId)
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
