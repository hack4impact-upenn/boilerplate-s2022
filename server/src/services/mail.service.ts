// TODO, see if this is the best way to organize this file
import 'dotenv/config';
import SGmail, { MailDataRequired } from '@sendgrid/mail';

const appName = 'Boilerplate'; // Replace with a relevant project name
const senderName = 'sender'; // Replace with a relevant project sender
const baseUrl = 'http://localhost:4000'; // TODO: figure out better place to put this

// eslint-disable-next-line no-useless-concat
SGmail.setApiKey(`${process.env.SENDGRID_KEY}`);

/**
 * Sends a reset password link to a user
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this reset attempt for the user
 */
const emailResetPasswordLink = async (email: string, token: string) => {
  // TODO: use a template to make this prettier
  const resetLink = `${baseUrl}/reset/${token}`;
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.EMAIL_ADDRESS || 'missing@mail.com',
      name: senderName,
    },
    to: email,
    subject: 'Link to Reset Password',
    html:
      `<p>You are receiving this because you (or someone else) have requested ` +
      `the reset of your account password for ${appName}. Please visit this ` +
      `<a href=${resetLink}>link</a> ` +
      `within an hour of receiving this email to successfully reset your password <p>` +
      `<p>If you did not request this change, please ignore this email and your ` +
      `account will remain secured.<p>`,
  };

  // Send the email and propogate the error up if one exists
  await SGmail.send(mailSettings);
};

/**
 * Sends an email to verify an email account
 * @param email The email of the user to send the link to
 */
const emailVerificationLink = async (email: string) => {
  console.log(`Unimplemented recovery for ${email}`);
  // TODO implement
};

export { emailVerificationLink, emailResetPasswordLink };
