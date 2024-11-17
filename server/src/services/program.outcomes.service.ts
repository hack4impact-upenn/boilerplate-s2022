import {
  IProgramOutcomes,
  ProgramOutcomes,
} from '../models/program.outcomes.model.ts';

// Get a list of project outcomes data points by org_id
const getProgramOutcomesByOrgId = async (orgId: string) => {
  const outcomes = await ProgramOutcomes.find({
    orgId,
  }).exec();
  return outcomes;
};

// Get a singular project outcomes data point by org_id and year
const getOneProgramOutcomes = async (year: Date, orgId: string) => {
  const outcomes = await ProgramOutcomes.findOne({
    orgId,
    year,
  }).exec();
  return outcomes;
};

const getAllProgramOutcomesByOrg = async (orgId: string) => {
  const outcomes = await ProgramOutcomes.find({ orgId }, [
    '_id',
    'year',
  ]).exec();
  return outcomes;
};
// Get all program outcomes of a given year
const getAllProgramOutcomesByYear = async (year: Date) => {
  const outcomes = await ProgramOutcomes.find({ year }).exec();
  return outcomes;
};

const addProgramOutcomes = async (obj: IProgramOutcomes) => {
  const newOutcomes = new ProgramOutcomes(obj);
  let outcomes = newOutcomes;
  try {
    outcomes = await newOutcomes.save();
  } catch (error) {
    throw new Error('Unable to add program outcome');
  }
  return outcomes;
};

const deleteProgramOutcomeById = async (id: string) => {
  try {
    const result = await ProgramOutcomes.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Program outcome not found');
    }
    return { message: 'Program outcome successfully deleted' };
  } catch (error) {
    console.error('Error deleting program outcome:', error);
    throw new Error('Unable to delete program outcome');
  }
};

export {
  getProgramOutcomesByOrgId,
  getOneProgramOutcomes,
  getAllProgramOutcomesByYear,
  addProgramOutcomes,
  getAllProgramOutcomesByOrg,
  deleteProgramOutcomeById,
};
