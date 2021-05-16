import nc from "next-connect";
import { getAllJobPosts } from "database-utils/admin";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";

const getAllJobPostsForAdmin = async (req, res) => {
  getAllJobPosts()
    .then((jobsData) => {
      sendSuccessResponse({
        res,
        payload: jobsData,
      });
    })
    .catch((error) => {
      console.log(error);
      sendErrorResponse({
        res,
        error: "Something went wrong",
      });
    });
};

const postApproveJobHandler = nc().get(getAllJobPostsForAdmin);

export default postApproveJobHandler;
