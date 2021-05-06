import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { getAllUserLinkPosts, getUserData } from "database-utils/user";
import moment from "moment";

const getAllUsersPosts = async (req, res) => {
  const { userId, sortBy = 'date', page = 1 } = req.body;

  const decryptedUserId = decryptData(userId);

  getAllUserLinkPosts(decryptedUserId, sortBy, page)
    .then(async (allPostsData) => {
      const allPostsList = [];

      await Promise.all(
        allPostsData.map(async (postData) => {
          try {
            const { id, userId, title, url, tags, createdAt } = postData;

            // Get user name from user ID
            const { name } = await getUserData(userId);

            // Get created at time from now
            const createdAtDate = moment(createdAt).toDate().toDateString();

            allPostsList.push({
              postId: id,
              postedBy: name,
              postTitle: title,
              postUrl: url,
              postTags: tags,
              postedAt: createdAtDate,
            });
          } catch (error) {
            console.log(error);
            sendErrorResponse({
              res,
              error,
            });
            return;
          }
        })
      );

      sendSuccessResponse({
        res,
        payload: allPostsList,
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
