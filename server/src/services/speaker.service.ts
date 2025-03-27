import { ISpeaker, Speaker } from '../models/speaker.model.ts';
import { User } from '../models/user.model.ts';

/**
 * Creates a new speaker profile in the database.
 * @param userId - string representing the user ID
 * @param organization - string representing the organization
 * @param bio - string representing the speaker's bio
 * @param location - string representing the location
 * @param inperson - boolean indicating if available for in-person events
 * @returns The created Speaker profile
 */
const createSpeaker = async (
  userId: string,
  organization: string,
  bio: string,
  location: string,
  inperson: boolean,
) => {
  const newSpeaker = new Speaker({
    userId,
    organization,
    bio,
    location,
    inperson,
  });
  const speaker = await newSpeaker.save();
  return speaker;
};

/**
 * Gets a speaker from the database by their userId
 * @param userId The userId of the speaker to get
 * @returns The Speaker or null if not found
 */
const getSpeakerByUserId = async (userId: string) => {
  const speaker = await Speaker.findOne({ userId }).exec();
  return speaker;
};

/**
 * Gets all speakers from the database
 * @returns Array of all speakers
 */
const getAllSpeakers = async () => {
  const speakers = await Speaker.find({})
    .populate('userId', 'firstName lastName email')
    .exec();
  return speakers;
};

/**
 * Updates a speaker's information
 * @param userId - The userId of the speaker to update
 * @param updateData - Object containing the fields to update
 * @returns The updated speaker
 */
const updateSpeaker = async (userId: string, updateData: Partial<ISpeaker>) => {
  const speaker = await Speaker.findOneAndUpdate({ userId }, updateData, {
    new: true,
  }).exec();
  return speaker;
};

/**
 * Deletes a speaker profile
 * @param userId - The userId of the speaker to delete
 * @returns The deleted speaker
 */
const deleteSpeaker = async (userId: string) => {
  const speaker = await Speaker.findOneAndDelete({ userId }).exec();
  return speaker;
};

const getfilterSpeakeredList = async (filteredParams: Record<string, any>) => {
  const speakers = await Speaker.find(filteredParams)
    .populate('userId', 'firstName lastName email')
    .exec();
  console.log(speakers);
  return speakers;
};

export {
  createSpeaker,
  getSpeakerByUserId,
  getAllSpeakers,
  updateSpeaker,
  deleteSpeaker,
  getfilterSpeakeredList,
};