import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { getAllPostsDataWithPagination } from "database-utils/global";
import { getAllLinkPosts } from "api-utils/functions";

const getPostsWithPagination = async (req, res) => {
  const { sortBy = "date", page = 1 } = req.query;

  getAllPostsDataWithPagination(sortBy, page)
    .then(async (allPostsData) => {
      const allPostsList = await getAllLinkPosts(res, allPostsData);

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

const publishgetPostsWithPaginationHandler = nc().get(getPostsWithPagination);

export default publishgetPostsWithPaginationHandler;
