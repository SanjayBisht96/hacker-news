import nc from "next-connect";
import { userLinkPostModel } from "models/user";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { publishAPost } from "database-utils/user";
import { addLinkPostTags } from "api-utils/functions";

const publishLinkPost = async (req, res) => {
  const { userId, postTitle, postTags, postURL } = req.body;

  const decryptedUserId = decryptData(userId);

  const userLinkPostModelData = userLinkPostModel(
    decryptedUserId,
    postTitle,
    postURL,
    postTags
  );

  publishAPost(userLinkPostModelData)
    .then(async (postData) => {
      const listOfTags = postTags.split("#").filter((item) => item !== "");

      await addLinkPostTags(res, postData, listOfTags);

      console.log(postData)

      sendSuccessResponse({
        res,
        message: "Your post has been published",
      });
      return;
    })
    .catch((error) => {
      console.log(error)
      sendErrorResponse({
        res,
        error,
      });
    });
};

const publishPublishLinkPostHandler = nc().post(publishLinkPost);

export default publishPublishLinkPostHandler;
