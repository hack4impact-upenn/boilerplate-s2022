import {
    IProgramOutcomes,
    ProgramOutcomes,
} from '../models/program.outcomes.model.ts';

// Get a list of project outcomes data points by org_id
const getProgramOutcomesByOrgId = async (org_id: string) => {
    const outcomes = await ProgramOutcomes.find({
        organization_name: org_id,
    }).exec();
    return outcomes;
};

// Get a singular project outcomes data point by org_id and year
const getOneProgramOutcomes = async (year: Date, org_id: string) => {
    const outcomes = await ProgramOutcomes.findOne({
        organization_name: org_id,
        year,
    }).exec();
    return outcomes;
};

export { getProgramOutcomesByOrgId, getOneProgramOutcomes };

