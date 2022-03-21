import express from 'express';
import { hash } from 'bcrypt';
import { User } from '../models/user';

const saltRounds = 10;

const register = async (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  const { password } = req.body;

  if (await User.findOne({ email })) {
    res.status(400).send({
      message: `User with email: ${email} already has an account.`,
    });
  }

  // hash + salt password
  // return should be seperate
  hash(password, saltRounds, (err: any, hashedPassword: string) => {
    if (err) {
      res.status(401).send({
        message: err.message,
      });
    }

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    return newUser
      .save()
      .then(() => res.sendStatus(201))
      .catch((e) => res.status(400).send({ message: e }));
  });
};

export default register;
