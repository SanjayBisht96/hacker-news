import nc from "next-connect";
import { userLinkPostModel, userLinkPostTagModel } from "models/user";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { publishAPost, publishATag } from "database-utils/user";

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
    .then((postData) => {
      const listOfTags = postTags.split("#").filter((item) => item !== "");

      listOfTags.forEach((tagName) => {
        const tagData = userLinkPostTagModel(postData.id, tagName);

        publishATag(tagData);
      });

      sendSuccessResponse({
        res,
        message: "Your post has been published",
      });
    })
    .catch((error) => {

      sendErrorResponse({
        res,
        error,
      });
    });
};

const publishPublishLinkPostHandler = nc().post(publishLinkPost);

export default publishPublishLinkPostHandler;
