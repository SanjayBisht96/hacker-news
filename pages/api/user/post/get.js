import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { getAllUserLinkPosts } from "database-utils/user";
import { getAllLinkPosts } from "api-utils/functions";

const getAllUsersPosts = async (req, res) => {
  const { userId } = req.body;
  const { sortBy = "date", page = 1 } = req.query;

  const decryptedUserId = decryptData(userId);

  getAllUserLinkPosts(decryptedUserId, sortBy, page)
    .then(async (allPostsData) => {
      const allPostsList = await getAllLinkPosts(res, allPostsData);
      console.log(allPostsList)

      sendSuccessResponse({
        res,
        payload: allPostsList,
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

const publishgetAllUsersPostsHandler = nc().post(getAllUsersPosts);

export default publishgetAllUsersPostsHandler;
