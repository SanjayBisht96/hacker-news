import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { getAllUserJobPosts } from "database-utils/user";
import moment from "moment";

const getUserJobPosts = async (req, res) => {
  const { userId, sortBy = "date", page = 1 } = req.body;

  const decryptedUserId = decryptData(userId, sortBy, page);

  getAllUserJobPosts(decryptedUserId, sortBy, page)
    .then(async (allJobPostsData) => {
      let allJobPosts = [];

      allJobPostsData.forEach((jobPost) => {
        const {
          id,
          userId,
          jobTitle,
          upvotes,
          jobDescription,
          jobURL,
          isActive,
          postedOn,
        } = jobPost;

        const postedOnDate = moment(postedOn).toDate().toDateString();

        allJobPosts.push({
          jobId: id,
          userId,
          jobTitle,
          jobDescription,
          upvotes,
          jobURL,
          isActive,
          postedAt: postedOnDate,
        });
      });

      sendSuccessResponse({
        res,
        payload: allJobPosts,
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

const publishgetAllUsersJobPostsHandler = nc().post(getUserJobPosts);

export default publishgetAllUsersJobPostsHandler;
