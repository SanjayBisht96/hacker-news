import nc from "next-connect";
import { getAJobByID, getUserDataById } from "database-utils/user";
import { updateApprovalJobPost } from "database-utils/admin";
import { sendSuccessResponse, sendErrorResponse } from "api-utils/SendResponse";
import { sendEmailToUsers } from "api-utils/functions";

const approveJobByAdmin = async (req, res) => {
  const { jobId, userId } = req.body;

  // 1. Approve the job and update in the data base
  updateApprovalJobPost(jobId).catch((error) => {
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
    subject: "Activate Your Account",

    // HTML body
    html: `Your job post has been approved. Congratulations! You can login into your account to see your job postings`,
  };

  // 3. Send email to the user
  sendEmailToUsers(emailMessageBody)
    .then(() => {
      sendSuccessResponse({
        res,
        message:
          "Job post has been approved & user has been notified via email",
      });
    })
    .catch((error) => {
      sendErrorResponse({
        res,
        error,
      });
    });
};

const postApproveJobHandler = nc().post(approveJobByAdmin);

export default postApproveJobHandler;
