import {
  IKitchenOutcomes,
  KitchenOutcomes,
} from '../models/kitchen.outcomes.model.ts';

const getOneKitchenOutcomes = async (year: Date, orgName: string) => {
  const outcomes = await KitchenOutcomes.findOne({
    organization_name: orgName,
    year,
  }).exec();
  return outcomes;
};

export { getOneKitchenOutcomes };
