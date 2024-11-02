import {
  IKitchenOutcomes,
  KitchenOutcomes,
} from '../models/kitchen.outcomes.model.ts';

const getOneKitchenOutcomes = async (year: Date, orgId: string) => {
  const outcomes = await KitchenOutcomes.findOne({
    org_id: orgId,
    year,
  }).exec();
  return outcomes;
};

export { getOneKitchenOutcomes };
