import nc from "next-connect";
import { userJobModel } from "models/user";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { postAJobForReview } from "database-utils/user";

const publishJob = async (req, res) => {
  const { userId, jobTitle, jobDescription, jobURL } = req.body;

  const decryptedUserId = decryptData(userId);

  const userJobModelData = userJobModel(
    decryptedUserId,
    jobTitle,
    jobDescription,
    jobURL
  );

  postAJobForReview(userJobModelData)
    .then((jobData) => {
      sendSuccessResponse({
        res,
        message: "Your job post has been sent for review.",
        payload: jobData,
      });
    })
    .catch((error) => {
      sendErrorResponse({
        res,
        error,
      });
    });
};

const publishJobAdminHandler = nc().post(publishJob);

export default publishJobAdminHandler;
