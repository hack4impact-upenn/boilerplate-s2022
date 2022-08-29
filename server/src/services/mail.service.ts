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
 * @returns an error if one occurred or `undefined`
 */
const emailResetPasswordLink = async (email: string, token: string) => {
  // TODO: use a third party library to make this prettier
  const mailOptions: MailDataRequired = {
    from: {
      email: process.env.EMAIL_ADDRESS || 'missing@mail.com',
      name: senderName,
    },
    to: email,
    subject: 'Link to Reset Password',
    text:
      `You are receiving this because you (or someone else) have requested ` +
      `the reset of your account for ${appName}. Please go to the following link ` +
      `within an hour of receiving this email to successfully reset your password ` +
      `\n\n${baseUrl}/reset/${token}\n\n` +
      `If you did not request this change, please ignore this email and your ` +
      `account will remain secured.`,
  };

  // Send the email and propogate the error up if one exists
  await SGmail.send(mailOptions);
};

/**
 * Sends an email to recover a password
 * @param email The email of the user to send the link to
 * @returns an `error` if one occurred or `undefined`
 */
const emailPasswordRecoveryLink = async (email: string) => {
  console.log(`Unimplemented recovery for ${email}`);
  // TODO implement
};

export { emailPasswordRecoveryLink, emailResetPasswordLink };
