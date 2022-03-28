import express from 'express';
import { IUser } from '../models/user';
import createUser from '../services/createUser.service';
import retrieveUser from '../services/retrieveUser.service';

const register = async (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  const { password } = req.body;

  const user: IUser | null = await retrieveUser(email);

  if (user) {
    res.status(400).send({
      message: `User with email: ${email} already has an account.`,
    });
  }

  // hash + salt password
  // return should be seperate
  createUser(email, password)
    .then(() => res.sendStatus(201))
    .catch((e) => res.status(400).send({ message: e }));
};

export default register;
