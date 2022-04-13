import express from 'express';
import { IUser } from '../models/user';
import { toggleAdmin, retrieveUser, retrieveAllUsers, deleteOne } from '../services/user.service';

const getAllUsers = async(req: express.Request, res: express.Response) => {
  // return all users
  return retrieveAllUsers()
    .then((userList) => res.send(userList))
    .catch((e) => {res.status(400).send({ message: e});
  });
};

const switchPrivilege = async (req: express.Request, res: express.Response) => {
  // Check if user exists
  const email = req.params.email;
  const user: IUser | null = await retrieveUser(email);
  if (!user) {
    return res.status(401).send({
      message: `User with email ${email} does not exist.`,
    });
  }
  // Toggles User's Admin Status
  return toggleAdmin(email)
    .then(() => res.sendStatus(201))
    .catch((e) => {
      console.log(e);
      res.status(400).send({ message: e });
    });
};

const deleteUser = async(req: express.Request, res: express.Response) => {
  const email = req.params.email;
  // check if user to delete is an admin
  const user: IUser | null = await retrieveUser(email);
  if (!user) {
    return res.status(401).send({
      message: `User to delete does not exist`,
    });
  }
  if (!user.admin) {
    return res.status(401).send({ message: 'Cannot delete an admin' });
  }
  // delete user 
  return deleteOne(email)
    .then(() => res.sendStatus(201))
    .catch((e) => {res.status(400).send({ message: e });
  });
};

export { getAllUsers, switchPrivilege, deleteUser };
