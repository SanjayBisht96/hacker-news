import nodemailer from "nodemailer";
import { sendErrorResponse } from "api-utils/SendResponse";
import { publishATag, publishALinkPostTag } from "database-utils/user";
import { getTagDataIfTagExists } from "database-utils/user";
import { userLinkPostTagModel, userTagModel } from "models/user";

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
        sendErrorResponse({
          res,
          error,
        });
      }
    })
  );
};
