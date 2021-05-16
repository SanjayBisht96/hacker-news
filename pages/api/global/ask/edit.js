import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { updateAskPostData } from "database-utils/global";
import { updateAskPostTags } from "api-utils/functions";
import { decryptData } from "api-utils/auth";

const updateAskPost = async (req, res) => {
  const { userId, askPostId, askPostData } = req.body;

  // 1. Send response as server error if unauthenticated
  decryptData(userId);

  updateAskPostData(askPostId, askPostData)
    .then(async (updatedAskPostData) => {
      // 1. If any tags needs to be updated
      if (askPostData.tags) {
        const listOfTags = askPostData.tags
          .split("#")
          .filter((item) => item !== "");

        const askPostTagPayload = {
          id: updatedAskPostData.id,
        };

        await updateAskPostTags(res, askPostTagPayload, listOfTags);
      }

      sendSuccessResponse({
        res,
        payload: updatedAskPostData,
        message: "A ask post has been updated",
      });
    })
    .catch((error) => {
      console.log(error)
      sendErrorResponse({
        res,
        error: 'Something went wrong',
      });
    });
};

const updateAskPostHandler = nc().patch(updateAskPost);

export default updateAskPostHandler;
