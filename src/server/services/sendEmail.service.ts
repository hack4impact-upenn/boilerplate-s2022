import express from 'express';
import nodemailer from 'nodemailer';

const sendEmail = async (
  email: string,
  token: string,
  res: express.Response,
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  // this should be a separate function, so other's can reuse it
  // TODO: add a function to send email. people should only have to
  // change it in one place

  const mailOptions = {
    // TODO: change the from address to a more relevant one to your project
    from: 'boilerplate@hack4impact.org',
    to: email,
    subject: 'Link To Reset Password',
    text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      `http://localhost:3000/resetPassword/${token}\n\n` +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  };

  // sendMail does not have Promises, so we pass the response object here
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      res.status(500).send({
        error: 'An error occurred while sending the email',
      });
    }

    return res.status(200).json({ message: 'Email sent', response });
  });
};

export default sendEmail;
