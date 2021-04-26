import nc from "next-connect";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { publishAPost, publishATag } from "database-utils/user";
import { getAllPostsDataWithPagination } from "database-utils/global";

const getAllUsersPosts = async (req, res) => {
//   const decryptedUserId = decryptData(userId);

//   const userLinkPostModelData = userLinkPostModel(
//     decryptedUserId,
//     postTitle,
//     postURL,
//     postTags
//   );

//   publishAPost(userLinkPostModelData)
//     .then((postData) => {
//       const listOfTags = postTags.split("#").filter((item) => item !== "");

//       listOfTags.forEach((tagName) => {
//         const tagData = userLinkPostTagModel(postData.id, tagName);

//         publishATag(tagData);
//       });

//       sendSuccessResponse({
//         res,
//         message: "Your post has been published",
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//       sendErrorResponse({
//         res,
//         error,
//       });
//     });

    getAllPostsDataWithPagination().then((allPostsData) => {

    }).catch((error) => {
        sendErrorResponse({
          res,
          error,
        });
      });
};

const publishgetAllUsersPostsHandler = nc().post(getAllUsersPosts);

export default publishgetAllUsersPostsHandler;
