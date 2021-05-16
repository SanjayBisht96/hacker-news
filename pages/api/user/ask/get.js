import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { getAllUserAskposts } from "database-utils/user";

const getAllUserAskPosts = async (req, res) => {
  const { userId, sortBy = 'date', page = 1 } = req.body;

  const decryptedUserId = decryptData(userId, sortBy, page);

  getAllUserAskposts(decryptedUserId, sortBy, page)
    .then(async (allAskPostsData) => {
      sendSuccessResponse({
        res,
        payload: allAskPostsData,
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

const publishgetAllUsersAskPostsHandler = nc().post(getAllUserAskPosts);

export default publishgetAllUsersAskPostsHandler;
