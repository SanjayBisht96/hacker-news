import nc from "next-connect";
import { getUserDataById } from "database-utils/user";
import { updateRejectJobPost } from "database-utils/admin";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { sendEmailToUsers } from "api-utils/functions";

const rejectJobByAdmin = async (req, res) => {
  const { jobId, userId } = req.body;

  // 1. Approve the job and update in the data base
  updateRejectJobPost(jobId).catch((error) => {
    sendErrorResponse({
      res,
      error,
    });
    return;
  });

  // 3. Get user data by user ID
  const userData = await getUserDataById(userId);

  const userEmail = userData.email;

  // Message object
  let emailMessageBody = {
    from: `Hacker News <${process.env.GMAIL_ACCOUNT_EMAIL_ADDRESS}>`,

    // Comma separated list of recipients
    to: userEmail,

    // Subject of the message
    subject: "Job posting rejected",

    // HTML body
    html: `Your job post has been rejected. There may be various reasons for that ie. Content quality`,
  };

  // 3. Send email to the user
  sendEmailToUsers(emailMessageBody)
    .then(() => {
      sendSuccessResponse({
        res,
        message:
          "Job post has been rejected & user has been notified via email",
      });
    })
    .catch((error) => {
      sendErrorResponse({
        res,
        error,
      });
    });
};

const postRejectJobHandler = nc().post(rejectJobByAdmin);

export default postRejectJobHandler;
