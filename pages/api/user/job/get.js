import nc from "next-connect";
import { getAJobByID } from "database-utils/user";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";

const getJobDetails = async (req, res) => {
  const { jobId } = req.body;

  getAJobByID(jobId)
    .then((jobData) => {
      sendSuccessResponse({
        res,
        message: jobData.isActive
          ? "Your job post has been approved."
          : "Your job post has been pending for review.",
        payload: {
          jobId: jobData.id,
          jobTitle: jobData.jobTitle,
          jobDescription: jobData.jobDescription,
          jobURL: jobData.jobURL,
          isActive: jobData.isActive,
          postedOn: jobData.postedOn,
        },
      });
    })
    .catch((error) => {
      console.log(error)
      sendErrorResponse({
        res,
        error: 'Something went wrong',
      });
    });
};

const getJobDetailsUserHandler = nc().post(getJobDetails);

export default getJobDetailsUserHandler;
