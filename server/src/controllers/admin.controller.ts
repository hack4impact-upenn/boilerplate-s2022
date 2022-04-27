import express from 'express';
import { IUser } from '../models/user';
import {
  upgradeToAdmin,
  getUserFromDB,
  getAllUsersFromDB,
  deleteOne,
} from '../services/user.service';

const getAllUsers = async (req: express.Request, res: express.Response) => {
  // return all users
  return getAllUsersFromDB()
    .then((userList) => {
      res.send(userList);
    })
    .catch((e) => {
      res.status(400).send({ message: e });
    });
};

const upgradePrivilege = async (
  req: express.Request,
  res: express.Response,
) => {
  // Check if user exists
  const email = req.body.email;
  console.log('switchPrivilege', email);
  const user: IUser | null = await getUserFromDB(email);
  if (!user) {
    return res.status(400).send({
      message: `User with email ${email} does not exist.`,
    });
  }
  // Upgrade's the user's admin status
  return upgradeToAdmin(email)
    .then((result) => {
      if (result) {
        res.sendStatus(200);
      } else {
        res.status(400).send({ message: 'Unable to upgrade user' });
      }
    })
    .catch((e) => {
      res.status(400).send({ message: e });
    });
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  const email = req.params.email;
  // check if user to delete is an admin
  const user: IUser | null = await getUserFromDB(email);
  if (!user) {
    return res.status(400).send({
      message: `User to delete does not exist`,
    });
  }
  if (user.admin) {
    return res.status(400).send({ message: 'Cannot delete an admin' });
  }
  // Delete user
  return deleteOne(email)
    .then(() => res.sendStatus(201))
    .catch((e) => {
      res.status(400).send({ message: e });
    });
};

export { getAllUsers, upgradePrivilege, deleteUser };
