import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { getAllUserAskposts } from "database-utils/user";
import moment from "moment";

const getAllUserAskPosts = async (req, res) => {
  const { userId, sortBy = "date", page = 1 } = req.body;

  const decryptedUserId = decryptData(userId, sortBy, page);

  getAllUserAskposts(decryptedUserId, sortBy, page)
    .then(async (allAskPostsData) => {
      let allAskPosts = [];

      allAskPostsData.forEach((askPost) => {
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

const publishgetAllUsersAskPostsHandler = nc().post(getAllUserAskPosts);

export default publishgetAllUsersAskPostsHandler;
