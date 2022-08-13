import express from 'express';
import { IUser } from '../models/user';
import {
  toggleAdmin,
  getUserByEmail,
  getAllUsersFromDB,
  deleteUserById,
} from '../services/user.service';

const getAllUsers = async (req: express.Request, res: express.Response) => {
  // return all users
  return getAllUsersFromDB()
    .then((userList) => {
      res.status(200).send(userList);
    })
    .catch((e) => {
      res.status(500).send({ message: e });
    });
};

const upgradePrivilege = async (
  req: express.Request,
  res: express.Response,
) => {
  // Check if user exists
  const email = req.body.email;
  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    return res.status(404).send({
      message: `User with email ${email} does not exist.`,
    });
  }

  if (user.admin) {
    return res.status(400).send({
      message: `user is already admin`,
    });
  }
  // Upgrade's the user's admin status
  return toggleAdmin(user)
    .then((result) => {
      if (result) {
        res.sendStatus(200);
      } else {
        res.status(500).send({ message: 'null user passed into toggle user' });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: e });
    });
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  const email = req.params.email;
  // check if user to delete is an admin
  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    return res.status(404).send({
      message: `User to delete does not exist`,
    });
  }
  const reqUser: IUser | undefined = req.user as IUser;

  if (!reqUser || !reqUser.email) {
    return res.status(401).send({ message: 'error in auth' });
  }

  if (reqUser.email === user.email) {
    return res.status(400).send({ message: 'Cannot delete self' });
  }

  if (user.admin) {
    return res.status(404).send({ message: 'Cannot delete an admin' });
  }
  // Delete user
  return deleteUserById(user._id)
    .then(() => res.sendStatus(200))
    .catch((e) => {
      res.status(500).send({ message: e });
    });
};

export { getAllUsers, upgradePrivilege, deleteUser };
