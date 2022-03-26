import express from 'express';
import retrieveUser from '../services/retrieveUser.service';
import sendEmail from '../services/sendEmail.service';
import updateResetPasswordToken from '../services/updateResetPasswordToken.service';

const forgotPassword = async (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  if (!email || email === '') {
    res.status(400).send({
      message: 'Email is required',
    });
  }

  const user = await retrieveUser(email);
  if (!user) {
    res.status(403).send({
      message: 'User does not exist',
    });
  }

  const token = await updateResetPasswordToken(email);

  sendEmail(email, token, res);
};

export default forgotPassword;
