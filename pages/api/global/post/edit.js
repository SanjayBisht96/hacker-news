import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { editALinkPostData } from "database-utils/global";
import { addLinkPostTags } from "api-utils/functions";
import { decryptData } from "api-utils/auth";

const editALinkPost = async (req, res) => {
  const { userId, linkPostId, linkPostData } = req.body;

  // 1. Send response as server error if unauthenticated
  decryptData(userId);

  editALinkPostData(linkPostId, linkPostData)
    .then(async (updatedLinkPostData) => {
      // 1. If any tags needs to be updated
      if (linkPostData.tags) {
        const listOfTags = linkPostData.tags
          .split("#")
          .filter((item) => item !== "");

        const linkPostTagPayload = {
          id: updatedLinkPostData.id,
        };

        await addLinkPostTags(res, linkPostTagPayload, listOfTags);
      }

      sendSuccessResponse({
        res,
        payload: updatedLinkPostData,
        message: "A link post has been edited",
      });
    })
    .catch((error) => {
      sendErrorResponse({
        res,
        error,
      });
    });
};

const editALinkPostHandler = nc().put(editALinkPost);

export default editALinkPostHandler;
