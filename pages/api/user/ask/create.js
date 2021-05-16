import nc from "next-connect";
import { userAskPostModel } from "models/user";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { getUserData, publishAskPostData } from "database-utils/user";
import { addAskPostTags } from "api-utils/functions";

const publishAskPost = async (req, res) => {
  const { userId, askTitle, askText, askTags } = req.body;

  const decryptedUserId = decryptData(userId);

  // Get user name from user ID
  const { name } = await getUserData(decryptedUserId);

  const userAskPostModelData = userAskPostModel(
    decryptedUserId,
    name,
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
      console.log(error)
      sendErrorResponse({
        res,
        error,
      });
    });
};

const publishPublishAskPostHandler = nc().post(publishAskPost);

export default publishPublishAskPostHandler;
