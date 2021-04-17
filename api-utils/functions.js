import nodemailer from "nodemailer";

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
