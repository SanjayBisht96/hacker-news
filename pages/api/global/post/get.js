import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { getAllPostsDataWithPagination } from "database-utils/global";
import moment from "moment";
import { getUserData } from "database-utils/user";

const getPostsWithPagination = async (req, res) => {
  getAllPostsDataWithPagination()
    .then(async (allPostsData) => {
      const allPostsList = [];

      await Promise.all(
        allPostsData.map(async (postData) => {
          try {
            const { id, userID, title, url, tags, createdAt } = postData;

            // Get user name from user ID
            const { name } = await getUserData(userID);

            // Get created at time from now
            const createdAtFromNow = moment(createdAt).fromNow();

            allPostsList.push({
              id,
              name,
              title,
              url,
              tags,
              createdAtFromNow,
            });
          } catch (error) {
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

const publishgetPostsWithPaginationHandler = nc().get(getPostsWithPagination);

export default publishgetPostsWithPaginationHandler;
