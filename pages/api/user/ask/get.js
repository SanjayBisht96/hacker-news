import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { getAllUserAskPostsData } from "database-utils/user";

const getAllUserAskPosts = async (req, res) => {
  const { userId } = req.body;

  const decryptedUserId = decryptData(userId);

  getAllUserAskPostsData(decryptedUserId)
    .then((allAskPostsData) => {
      sendSuccessResponse({
        res,
        payload: allAskPostsData,
      });
    })
    .catch((error) => {
      sendErrorResponse({
        res,
        error,
      });
    });
};

const publishgetAllUsersAskPostsHandler = nc().post(getAllUserAskPosts);

export default publishgetAllUsersAskPostsHandler;
