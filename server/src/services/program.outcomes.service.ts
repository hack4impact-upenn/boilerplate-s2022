import {
  IProgramOutcomes,
  ProgramOutcomes,
} from '../models/program.outcomes.model.ts';

// Get a list of project outcomes data points by org_id
const getProgramOutcomesByOrgId = async (orgId: string) => {
  const outcomes = await ProgramOutcomes.find({
    org_id: orgId,
  }).exec();
  return outcomes;
};

// Get a singular project outcomes data point by org_id and year
const getOneProgramOutcomes = async (year: Date, orgId: string) => {
  const outcomes = await ProgramOutcomes.findOne({
    org_id: orgId,
    year,
  }).exec();
  return outcomes;
};

// Get all program outcomes of a given year
const getAllProgramOutcomesByYear = async (year: Date) => {
  const outcomes = await ProgramOutcomes.find({ year }).exec();
  return outcomes;
};

export {
  getProgramOutcomesByOrgId,
  getOneProgramOutcomes,
  getAllProgramOutcomesByYear,
};
