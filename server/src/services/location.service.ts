import { ILocation, Location } from '../models/location.model.ts';

const createLocation = async (person: ILocation) => {
  const newLocation = new Location(person);
  const result = await newLocation.save();
  return result;
};

const getAllLocations = async () => {
  const locationList = await Location.find({}).exec();
  return locationList;
};

const getLocationByName = async (name: string) => {
  const location = await Location.findOne({ name }).exec();
  return location;
};

const deleteLocationByName = async (name: string) => {
  const location = await Location.findByIdAndDelete(name).exec();
  return location;
};

// eslint-disable-next-line import/prefer-default-export
export {
  createLocation,
  getAllLocations,
  getLocationByName,
  deleteLocationByName,
};
