import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { decryptData } from "api-utils/auth";
import { getLinkPostById } from "database-utils/user";

const getUserLinkPostByPostId = async (req, res) => {
  const { userId, linkPostId } = req.body;

  decryptData(userId);

  getLinkPostById(linkPostId)
    .then(async (linkPostData) => {
      
      const payload = {
        id: linkPostData.id,
        userId: linkPostData.userId,
        title: linkPostData.title,
        url: linkPostData.url,
        tags: linkPostData.tags,
      };

      sendSuccessResponse({
        res,
        payload,
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

const getUserLinkPostByPostIdHandler = nc().post(
  getUserLinkPostByPostId
);

export default getUserLinkPostByPostIdHandler;
