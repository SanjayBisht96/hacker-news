import nc from "next-connect";
import {
  userLinkPostModel,
  userLinkPostTagModel,
  userTagModel,
} from "models/user";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import {
  publishAPost,
  publishATag,
  publishALinkPostTag,
} from "database-utils/user";
import { getTagDataIfTagExists } from "database-utils/global";

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
      console.log(listOfTags);

      await Promise.all(
        listOfTags.map(async (tagName) => {
          try {
            // 0. Get Tag ID if tag exists
            let tagData = await getTagDataIfTagExists(tagName);

            if (tagData) {
              // 1A. If tag exists by name => Get tag ID
              const { id } = tagData;

              // 1B. Create Link post tag with post ID
              const linkPostTagModel = userLinkPostTagModel(postData.id, id);

              publishALinkPostTag(linkPostTagModel);
            } else {
              // 2A. Else Create a new tag in tag
              const tagModelData = userTagModel(tagName);

              tagData = await publishATag(tagModelData);

              // 2B. Create Link post tag with post ID
              const linkPostTagModel = userLinkPostTagModel(
                postData.id,
                tagData.id
              );

              await publishALinkPostTag(linkPostTagModel);
            }
          } catch (error) {
            console.log(error);
          }
        })
      );

      sendSuccessResponse({
        res,
        message: "Your post has been published",
      });
    })
    .catch((error) => {
      console.log(error);
      sendErrorResponse({
        res,
        error,
      });
    });
};

const publishPublishLinkPostHandler = nc().post(publishLinkPost);

export default publishPublishLinkPostHandler;
