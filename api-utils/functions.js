import nodemailer from "nodemailer";
import { sendErrorResponse } from "api-utils/SendResponse";
import {
  publishATag,
  publishAskPostTag,
  publishALinkPostTag,
  getUserData,
} from "database-utils/user";
import { getTagDataIfTagExists } from "database-utils/user";
import {
  userLinkPostTagModel,
  userAskPostTagModel,
  userTagModel,
} from "models/user";
import moment from "moment";

// Send email to the email address
export const sendEmailToUsers = async (emailMessageBody) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.GMAIL_ACCOUNT_EMAIL_ADDRESS,
      pass: process.env.GMAIL_ACCOUNT_EMAIL_PASSWORD, // generated ethereal password
    },
  });

  transporter.sendMail(emailMessageBody, (error) => {
    if (error) {
      console.log("Error: " + error);
    }
  });
};

// Add link post tags
export const addLinkPostTags = async (res, postData, listOfTags) => {
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

          await publishALinkPostTag(linkPostTagModel);
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
        sendErrorResponse({
          res,
          error,
        });
        return;
      }
    })
  );
};

// Update link post tags
export const updateLinkPostTags = async (res, postData, listOfTags) => {
  await Promise.all(
    listOfTags.map(async (tagName) => {
      try {
        // 0. Get Tag ID if tag exists
        let tagData = await getTagDataIfTagExists(tagName);

        // If tag doesn't exist then only create it
        if (!tagData) {
          const tagModelData = userTagModel(tagName);

          tagData = await publishATag(tagModelData);

          const linkPostTagModel = userLinkPostTagModel(
            postData.id,
            tagData.id
          );

          await publishALinkPostTag(linkPostTagModel);
        }
      } catch (error) {
        console.log(error);
        sendErrorResponse({
          res,
          error,
        });
        return;
      }
    })
  );
};

// Add ask post tags
export const addAskPostTags = async (res, askData, listOfTags) => {
  await Promise.all(
    listOfTags.map(async (tagName) => {
      try {
        // 0. Get Tag ID if tag exists
        let tagData = await getTagDataIfTagExists(tagName);

        if (tagData) {
          // 1A. If tag exists by name => Get tag ID
          const { id } = tagData;

          // 1B. Create Ask ask tag with ask ID
          const askPostTagModel = userAskPostTagModel(askData.id, id);

          publishAskPostTag(askPostTagModel);
        } else {
          // 2A. Else Create a new tag in tag
          const tagModelData = userTagModel(tagName);

          console.log(tagModelData);

          tagData = await publishATag(tagModelData);

          // 2B. Create Ask ask tag with ask ID
          const askPostTagModel = userAskPostTagModel(askData.id, tagData.id);

          await publishAskPostTag(askPostTagModel);
        }
      } catch (error) {
        sendErrorResponse({
          res,
          error,
        });
      }
    })
  );
};

// Get user link posts
export const getAllLinkPosts = async (res, allPostsData) => {
  const allPostsList = [];

  await Promise.all(
    allPostsData.map(async (postData) => {
      try {
        const { id, userId, title, url, tags, createdAt } = postData;

        // Get user name from user ID
        const { name } = await getUserData(userId);

        // Get created at time from now
        const createdAtDate = moment(createdAt).toDate().toDateString();

        allPostsList.push({
          postId: id,
          postedBy: name,
          postTitle: title,
          postUrl: url,
          postTags: tags,
          postedAt: createdAtDate,
        });
      } catch (error) {
        console.log(error);
        sendErrorResponse({
          res,
          error,
        });
        return;
      }
    })
  );

  return allPostsList;
};

// Update ask post tags
export const updateAskPostTags = async (res, postData, listOfTags) => {
  await Promise.all(
    listOfTags.map(async (tagName) => {
      try {
        // 0. Get Tag ID if tag exists
        let tagData = await getTagDataIfTagExists(tagName);

        // If tag doesn't exist then only create it
        if (!tagData) {
          const tagModelData = userTagModel(tagName);

          tagData = await publishATag(tagModelData);

          const linkPostTagModel = userAskPostTagModel(
            postData.id,
            tagData.id
          );

          await publishAskPostTag(linkPostTagModel);
        }
      } catch (error) {
        console.log(error);
        sendErrorResponse({
          res,
          error: 'something went wrong',
        });
        return;
      }
    })
  );
};