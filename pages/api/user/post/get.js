import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { getAllUserLinkPosts } from "database-utils/user";

const getAllUsersPosts = async (req, res) => {
  const { userId } = req.body;

  const decryptedUserId = decryptData(userId);

  getAllUserLinkPosts(decryptedUserId)
    .then((allPostsData) => {
      sendSuccessResponse({
        res,
        payload: allPostsData,
      });
    })
    .catch((error) => {
      sendErrorResponse({
        res,
        error,
      });
    });
};

const publishgetAllUsersPostsHandler = nc().post(getAllUsersPosts);

export default publishgetAllUsersPostsHandler;
