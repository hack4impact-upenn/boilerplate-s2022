import { ToxicPerson } from '../models/toxicperson.model';

const getToxicPersonByFirstAndLastName = async (
  pFirstName: string,
  pLastName: string,
) => {
  const toxicPerson = await ToxicPerson.findOne({
    firstName: pFirstName,
    lastName: pLastName,
  }).exec();
  return toxicPerson;
};

const getToxicPersonByID = async (id: string) => {
  const toxicPerson = await ToxicPerson.findOne({ _id: id }).exec();
  return toxicPerson;
};

// const getUserById = async (id: string) => {
//   const user = await User.findById(id)
//     .select(['-password', '-accountType'])
//     .exec();
//   return user;
// };

// const getUserByEmailWithPassword = async (email: string) => {
//   const user = await User.findOne({ email }).select(['-accountType']).exec();
//   return user;
// };

const getAllToxicPeopleFromDB = async () => {
  const personList = await ToxicPerson.find({}).exec();
  return personList;
};

const createToxicPersonDB = async (
  firstName: string,
  lastName: string,
  pictureUrl: string,
) => {
  const newToxicTrait = new ToxicPerson({
    firstName,
    lastName,
    pictureUrl,
  });
  const addedToxicTrait = await newToxicTrait.save();
  return addedToxicTrait;
};

/**
 * A function that upgrades a certain user to an admin.
 * @param id
 * @returns updated user
 */
// const toggleAdmin = async (id: string) => {
//   const user = await User.findByIdAndUpdate(id, [
//     { $set: { admin: { $eq: [false, '$admin'] } } },
//   ]).exec();
//   return user;
// };

const deleteToxicPersonByID = async (id: string) => {
  const toxicPerson = await ToxicPerson.findByIdAndDelete(id).exec();
  return toxicPerson;
};

const deleteToxicPersonByFirstAndLastName = async (
  pFirstName: string,
  pLastName: string,
) => {
  const toxicPerson = await ToxicPerson.findByIdAndDelete({
    firstName: pFirstName,
    lastName: pLastName,
  }).exec();
  return toxicPerson;
};

const updateToxicPersonDB = async (
  pFirstName: string,
  pLastName: string,
  pToxicTrait: string,
) => {
  const toxicPerson = ToxicPerson.updateOne(
    {
      firstName: pFirstName,
      lastName: pLastName,
    },
    { $push: { toxicTraits: pToxicTrait } },
  );
  return toxicPerson;
};

export {
  getToxicPersonByFirstAndLastName,
  getToxicPersonByID,
  getAllToxicPeopleFromDB,
  createToxicPersonDB,
  deleteToxicPersonByID,
  deleteToxicPersonByFirstAndLastName,
  updateToxicPersonDB,
};
