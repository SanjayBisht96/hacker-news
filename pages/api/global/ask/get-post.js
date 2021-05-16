import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { getAskPostById } from "database-utils/user";
import moment from "moment";

const getUserAskPostByAskId = async (req, res) => {
  const { userId, askId } = req.body;

  decryptData(userId);

  getAskPostById(askId)
    .then(async (askData) => {
      const { id, userId, username, title, upvotes, text, tags, createdAt } =
        askData;

      const createdAtDate = moment(createdAt).toDate().toDateString();

      const payload = {
        id,
        userId,
        username,
        title,
        upvotes,
        text,
        tags,
        postedAt: createdAtDate,
      };

      sendSuccessResponse({
        res,
        payload,
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

const getUserAskPostByAskIdHandler = nc().post(getUserAskPostByAskId);

export default getUserAskPostByAskIdHandler;
