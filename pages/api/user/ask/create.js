import nc from "next-connect";
import { userAskPostModel } from "models/user";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { publishAskPostData } from "database-utils/user";
import { addAskPostTags } from "api-utils/functions";

const publishAskPost = async (req, res) => {
  const { userId, askTitle, askText, askTags } = req.body;

  const decryptedUserId = decryptData(userId);

  const userAskPostModelData = userAskPostModel(
    decryptedUserId,
    askTitle,
    askText,
    askTags
  );

  publishAskPostData(userAskPostModelData)
    .then(async (askData) => {
      const listOfTags = askTags.split("#").filter((item) => item !== "");

      await addAskPostTags(res, askData, listOfTags);

      sendSuccessResponse({
        res,
        message: "Your ask has been published",
      });
    })
    .catch((error) => {
      sendErrorResponse({
        res,
        error,
      });
    });
};

const publishPublishAskPostHandler = nc().post(publishAskPost);

export default publishPublishAskPostHandler;
