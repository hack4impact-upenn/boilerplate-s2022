import mongoose from 'mongoose';

const KitchenOutcomesSchema = new mongoose.Schema({
  org_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemberOrganization',
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  shareSurvey: {
    type: String,
    enum: ['Yes', 'No'],
  },
  organizationName: {
    type: String,
    required: true,
  },
  responderName: {
    type: String,
    required: true,
  },
  responderTitle: {
    type: String,
    required: true,
  },
  hungerReliefsMealsServed: {
    type: Number,
  },
  typeOfMealsServed: {
    type: [String], // Assuming multiple meal types can be selected
    enum: ['value1', 'value2'], // Replace with actual options
  },
  costPerMeal: {
    type: Number,
  },
  foodCostPercentage: {
    type: Number,
  },
  mealReimbursement: {
    type: Number,
  },
  mealFundingPublic: {
    type: Number,
  },
  mealFundingPrivateContracts: {
    type: Number,
  },
  mealFundingPrivateDonations: {
    type: Number,
  },
  mealsFemale: {
    type: Number,
  },
  mealsMale: {
    type: Number,
  },
  mealsNonBinary: {
    type: Number,
  },
  mealsGenderUnknown: {
    type: Number,
  },
  mealsTransgender: {
    type: Number,
  },
  mealsAmericanIndian: {
    type: Number,
  },
  mealsAsian: {
    type: Number,
  },
  mealsBlack: {
    type: Number,
  },
  mealsLatinx: {
    type: Number,
  },
  mealsNativeHawaiian: {
    type: Number,
  },
  mealsMultiRacial: {
    type: Number,
  },
  mealsWhite: {
    type: Number,
  },
  mealsOtherRace: {
    type: Number,
  },
  mealsRaceUnknown: {
    type: Number,
  },
  mealsInfants: {
    type: Number,
  },
  mealsChildren: {
    type: Number,
  },
  mealsAdults: {
    type: Number,
  },
  mealsSeniors: {
    type: Number,
  },
  mealsAgeUnknown: {
    type: Number,
  },
  capitalExpansionProjects: {
    type: String,
    enum: ['value1', 'value2'], // Replace with actual options
  },
  capitalProjectSize: {
    type: Number,
  },
  capitalProjectDate: {
    type: Date,
  },
  capitalExpansionProjectNeeds: {
    type: String,
    enum: ['value1', 'value2'], // Replace with actual options
  },
  retailSocialEnterpriseRevenue: {
    type: Number,
  },
  grossRevenueCafe: {
    type: String,
    enum: ['value1', 'value2'], // Replace with actual categories
  },
  grossRevenueRestaurant: {
    type: String,
    enum: ['value1', 'value2'],
  },
  grossRevenueCatering: {
    type: String,
    enum: ['value1', 'value2'],
  },
  grossRevenueFoodTruck: {
    type: String,
    enum: ['value1', 'value2'],
  },
  grossRevenueWholesale: {
    type: String,
    enum: ['value1', 'value2'],
  },
  grossRevenueFoodSubscription: {
    type: String,
    enum: ['value1', 'value2'],
  },
});

interface IKitchenOutcomes extends mongoose.Document {
  _id: string;
  org_id: string;
  year: number;
  shareSurvey: string;
  organizationName: string;
  responderName: string;
  responderTitle: string;
  hungerReliefsMealsServed: number;
  typeOfMealsServed: string[];
  costPerMeal: number;
  foodCostPercentage: number;
  mealReimbursement: number;
  mealFundingPublic: number;
  mealFundingPrivateContracts: number;
  mealFundingPrivateDonations: number;
  mealsFemale: number;
  mealsMale: number;
  mealsNonBinary: number;
  mealsGenderUnknown: number;
  mealsTransgender: number;
  mealsAmericanIndian: number;
  mealsAsian: number;
  mealsBlack: number;
  mealsLatinx: number;
  mealsNativeHawaiian: number;
  mealsMultiRacial: number;
  mealsWhite: number;
  mealsOtherRace: number;
  mealsRaceUnknown: number;
  mealsInfants: number;
  mealsChildren: number;
  mealsAdults: number;
  mealsSeniors: number;
  mealsAgeUnknown: number;
  capitalExpansionProjects: string;
  capitalProjectSize: number;
  capitalProjectDate: Date;
  capitalExpansionProjectNeeds: string;
  retailSocialEnterpriseRevenue: number;
  grossRevenueCafe: string;
  grossRevenueRestaurant: string;
  grossRevenueCatering: string;
  grossRevenueFoodTruck: string;
  grossRevenueWholesale: string;
  grossRevenueFoodSubscription: string;
}

const KitchenOutcomes = mongoose.model<IKitchenOutcomes>('KitchenOutcomes', KitchenOutcomesSchema);

export { IKitchenOutcomes, KitchenOutcomes };
