import express from 'express';
import { IToxicPerson } from '../models/toxicperson.model';
import {
  getToxicPersonByFirstAndLastName,
  getToxicPersonByID,
  getAllToxicPeopleFromDB,
  createToxicPersonDB,
  deleteToxicPersonByID,
  updateToxicPersonDB,
} from '../services/toxicperson.service';

const getAllToxicPeople = async (
  req: express.Request,
  res: express.Response,
) => {
  // return all users
  return getAllToxicPeopleFromDB()
    .then((toxicPeopleList) => {
      res.status(200).send(toxicPeopleList);
    })
    .catch((e) => {
      res.status(500).send({ message: e });
    });
};

const getPersonByID = async (req: express.Request, res: express.Response) => {
  const { id } = req.body;
  return getToxicPersonByID(id)
    .then((toxicPersonResult) => {
      res.status(200).send(toxicPersonResult);
    })
    .catch((e) => {
      res.status(500).send({ message: e });
    });
};

const getToxicPersonByFirstAndName = async (
  req: express.Request,
  res: express.Response,
) => {
  const { firstName } = req.query;
  const { lastName } = req.query;
  if (!firstName || !lastName) {
    res.status(500).send({ message: 'no user found' });
  }
  if (!firstName || !lastName) {
    return null;
  }
  return getToxicPersonByFirstAndLastName(
    firstName as string,
    lastName as string,
  )
    .then((toxicPersonResult) => {
      res.status(200).send(toxicPersonResult);
    })
    .catch((e) => {
      res.status(500).send({ message: e });
    });
};

const createToxicPerson = async (
  req: express.Request,
  res: express.Response,
) => {
  // return all users
  // do we want this to be body or params?
  const { firstName, lastName, pictureUrl } = req.body;
  return createToxicPersonDB(firstName, lastName, pictureUrl)
    .then((toxicPersonResult) => {
      res.status(200).send(toxicPersonResult);
    })
    .catch((e) => {
      res.status(500).send({ message: e });
    });
};

// const upgradePrivilege = async (
//   req: express.Request,
//   res: express.Response,
// ) => {
//   // Check if user exists
//   console.log('here');
//   const { email } = req.body;
//   const user: IUser | null = await getUserByEmail(email);
//   if (!user) {
//     return res.status(404).send({
//       message: `User with email ${email} does not exist.`,
//     });
//   }

//   if (user.admin) {
//     console.log('here1');
//     return res.status(400).send({
//       message: `user is already admin`,
//     });
//   }
//   // Upgrade's the user's admin status
//   return toggleAdmin(user._id)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((e) => {
//       res.status(500).send({ message: e });
//     });
// };

const deleteToxicPerson = async (
  req: express.Request,
  res: express.Response,
) => {
  const { firstName, lastName } = req.body;
  // check if user to delete is an admin
  const toxicPerson: IToxicPerson | null =
    await getToxicPersonByFirstAndLastName(firstName, lastName);
  if (!toxicPerson) {
    return res.status(404).send({
      message: `First Name and Last Name to delete do not exist`,
    });
  }

  // Delete user
  return deleteToxicPersonByID(toxicPerson._id)
    .then(() => res.sendStatus(200))
    .catch((e) => {
      res.status(500).send({ message: e });
    });
};

const updateToxicPerson = async (
  req: express.Request,
  res: express.Response,
) => {
  const { firstName, lastName, trait } = req.body;
  const toxicPerson: IToxicPerson | null =
    await getToxicPersonByFirstAndLastName(firstName, lastName);
  if (!toxicPerson) {
    return res.status(404).send({
      message: `First Name to delete does not exist`,
    });
  }

  // Delete user
  return updateToxicPersonDB(toxicPerson.firstName, toxicPerson.lastName, trait)
    .then(() => res.sendStatus(200))
    .catch((e) => {
      res.status(500).send({ message: e });
    });
};

export {
  getAllToxicPeople,
  getPersonByID,
  getToxicPersonByFirstAndName,
  createToxicPerson,
  deleteToxicPerson,
  updateToxicPerson,
};
