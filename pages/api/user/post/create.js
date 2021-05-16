import nc from "next-connect";
import { userLinkPostModel } from "models/user";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { addLinkPostTags } from "api-utils/functions";
import { publishAPost, getUserName } from "database-utils/user";

const publishLinkPost = async (req, res) => {
  const { userId, postTitle, postTags, postURL } = req.body;
  const decryptedUserId = decryptData(userId);
  const username = await getUserName(decryptedUserId);

  console.log(username);

  const userLinkPostModelData = userLinkPostModel(
    decryptedUserId,
    username,
    postTitle,
    postURL,
    postTags
  );

  publishAPost(userLinkPostModelData)
    .then(async (postData) => {
      const listOfTags = postTags.split("#").filter((item) => item !== "");

      await addLinkPostTags(res, postData, listOfTags);

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
        error: 'Something went wrong',
      });
    });
};

const publishPublishLinkPostHandler = nc().post(publishLinkPost);

export default publishPublishLinkPostHandler;
