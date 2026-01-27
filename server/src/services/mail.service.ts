/**
 * All the functions related to sending emails
 * NOTE: SendGrid has been disabled - these functions are now no-ops
 */
import 'dotenv/config';

const appName = 'Boilerplate'; // Replace with a relevant project name
const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

/**
 * Sends a reset password link to a user
 * NOTE: Email sending is disabled
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this reset attempt for the user
 */
const emailResetPasswordLink = async (email: string, token: string) => {
  // Email sending disabled
  console.log(
    `[Email Disabled] Would send reset password link to ${email} with token ${token}`,
  );
  console.log(`Reset link would be: ${baseUrl}/reset-password/${token}`);
  return Promise.resolve();
};

/**
 * Sends an email to verify an email account
 * NOTE: Email sending is disabled
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this verification attempt
 */
const emailVerificationLink = async (email: string, token: string) => {
  // Email sending disabled
  console.log(
    `[Email Disabled] Would send verification link to ${email} with token ${token}`,
  );
  console.log(`Verification link would be: ${baseUrl}/verify-account/${token}`);
  return Promise.resolve();
};

/**
 * Sends an email with an invite link to create an account
 * NOTE: Email sending is disabled
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this verification attempt
 */
const emailInviteLink = async (email: string, token: string) => {
  // Email sending disabled
  console.log(
    `[Email Disabled] Would send invite link to ${email} with token ${token}`,
  );
  console.log(`Invite link would be: ${baseUrl}/invite/${token}`);
  return Promise.resolve();
};

export { emailVerificationLink, emailResetPasswordLink, emailInviteLink };
