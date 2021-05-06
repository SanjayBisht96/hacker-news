import nodemailer from "nodemailer";
import { sendErrorResponse } from "api-utils/SendResponse";
import { publishATag, publishAskPostTag, publishALinkPostTag } from "database-utils/user";
import { getTagDataIfTagExists } from "database-utils/user";
import { userLinkPostTagModel, userAskPostTagModel, userTagModel } from "models/user";

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
        console.log(error)
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

          tagData = await publishATag(tagModelData);

          // 2B. Create Ask ask tag with ask ID
          const askPostTagModel = userAskPostTagModel(
            askData.id,
            tagData.id
          );

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
