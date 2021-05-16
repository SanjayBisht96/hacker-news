import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { deleteALinkPostData } from "database-utils/global";
import { decryptData } from "api-utils/auth";

const deleteALinkPost = async (req, res) => {
  const { userId, linkPostId } = req.body;

  // 1. Send response as server error if unauthenticated
  decryptData(userId);

  deleteALinkPostData(linkPostId)
    .then(async () => {
      sendSuccessResponse({
        res,
        message: "A link post has been deleted",
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

const editALinkPostHandler = nc().delete(deleteALinkPost);

export default editALinkPostHandler;
