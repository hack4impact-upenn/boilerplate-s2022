import {
  IKitchenOutcomes,
  KitchenOutcomes,
} from '../models/kitchen.outcomes.model.ts';

const getOneKitchenOutcomes = async (year: Date, orgId: string) => {
  const outcomes = await KitchenOutcomes.findOne({
    orgId,
    year,
  }).exec();
  return outcomes;
};

const addKitchenOutcomes = async (obj: IKitchenOutcomes) => {
  const newOutcomes = new KitchenOutcomes(obj);
  const outcomes = await newOutcomes.save();
  return outcomes;
};

export { getOneKitchenOutcomes, addKitchenOutcomes };
