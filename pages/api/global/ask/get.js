import nc from "next-connect";
import moment from "moment";
import { decryptData } from "api-utils/auth";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { getAllAskPostDataWithPagination } from "database-utils/global";

const getAskPostWithPagination = async (req, res) => {
  const { sortBy = "date", page = 1 } = req.query;
  const { userId } = req.body;

  decryptData(userId);

  getAllAskPostDataWithPagination(sortBy, page)
    .then(async (allAskPostData) => {
      let allAskPosts = [];

      allAskPostData.forEach((askPost) => {
        const { id, userId, username, title, upvotes, text, tags, createdAt } =
          askPost;

        const createdAtDate = moment(createdAt).toDate().toDateString();

        allAskPosts.push({
          askId: id,
          userId,
          askedBy: username,
          askTitle: title,
          upvotes,
          askText: text,
          askTags: tags,
          postedAt: createdAtDate,
        });
      });
      sendSuccessResponse({
        res,
        payload: allAskPosts,
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

const publishgetAskPostWithPaginationHandler = nc().post(
  getAskPostWithPagination
);

export default publishgetAskPostWithPaginationHandler;
