import React from 'react';
import {
  Button,
  Box,
  Checkbox,
  Radio,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

export default function KitchenOutcome() {
  // Define the form state type
  type FormState = {
    email: string;
    shareSurvey: boolean;
    responderName: string;
    responderTitle: string;
    organizationName: string;
    noMealsServerd: number;
    mealTypes: {
      childCare: boolean;
      school: boolean;
      soupKitchen: boolean;
      shelter: boolean;
      transitionalHousing: boolean;
      senior: boolean;
      medical: boolean;
    };
    mealFunding: {
      publicFunding: number;
      privateContracts: number;
      privateDonations: number;
    };
    gender: {
      male: number;
      female: number;
      nonBinary: number;
      unknown: number;
      transgender: number;
    };
    race: {
      americanIndian: number;
      asian: number;
      black: number;
      latinx: number;
      pacificIslander: number;
      multiracial: number;
      white: number;
      other: number;
      unknown: number;
    };
    age: {
      infants: number;
      children: number;
      adults: number;
      seniors: number;
      unknown: number;
    };
    contractMealRevenue: number;
    costPerMeal: number;
    foodCostPercentage: number;
    mealReimbursement: number;
    retailSocialEnterpriseRevenue: number;
    expansionProjectNeeds: {
      howStart: boolean;
      planCost: boolean;
      fundraisingStrat: boolean;
      constructionCosts: boolean;
      equipment: boolean;
      operatingExpenses: boolean;
    };
    categoryState: Record<CategoryKey, string>;
    capitalExpansionProject: string;
    capitalProjectSize: number;
    capitalExpansionMonth: string;
    capitalExpansionYear: number;
  };

  // Define the type for category keys
  type CategoryKey =
    | 'cafe'
    | 'restaurant'
    | 'catering'
    | 'foodTruck'
    | 'wholesale'
    | 'foodSubscription';

  // Initialize formState with the FormState type
  const [formState, setFormState] = React.useState<FormState>({
    email: '',
    shareSurvey: false,
    responderName: '',
    responderTitle: '',
    organizationName: '',
    noMealsServerd: 0,
    mealTypes: {
      childCare: false,
      school: false,
      soupKitchen: false,
      shelter: false,
      transitionalHousing: false,
      senior: false,
      medical: false,
    },
    mealFunding: {
      publicFunding: 0,
      privateContracts: 0,
      privateDonations: 0,
    },
    gender: {
      male: 0,
      female: 0,
      nonBinary: 0,
      unknown: 0,
      transgender: 0,
    },
    race: {
      americanIndian: 0,
      asian: 0,
      black: 0,
      latinx: 0,
      pacificIslander: 0,
      multiracial: 0,
      white: 0,
      other: 0,
      unknown: 0,
    },
    age: {
      infants: 0,
      children: 0,
      adults: 0,
      seniors: 0,
      unknown: 0,
    },
    contractMealRevenue: 0,
    costPerMeal: 0,
    foodCostPercentage: 0,
    mealReimbursement: 0,
    retailSocialEnterpriseRevenue: 0,
    expansionProjectNeeds: {
      howStart: false,
      planCost: false,
      fundraisingStrat: false,
      constructionCosts: false,
      equipment: false,
      operatingExpenses: false,
    },
    categoryState: {
      cafe: '',
      restaurant: '',
      catering: '',
      foodTruck: '',
      wholesale: '',
      foodSubscription: '',
    },
    capitalExpansionProject: '',
    capitalProjectSize: 0,
    capitalExpansionMonth: '',
    capitalExpansionYear: new Date().getFullYear(),
  });

  // Update the categories object
  const categories: Record<string, CategoryKey> = {
    Cafe: 'cafe',
    Restaurant: 'restaurant',
    Catering: 'catering',
    'Food Truck': 'foodTruck',
    'Wholesale, Co-Packing, or White Labeling': 'wholesale',
    'Food or Meal Subscription Services': 'foodSubscription',
  };

  const revenueRanges = [
    { label: 'Less than $100K', value: 'lessThan100K' },
    { label: '$100K to $250K', value: '100Kto250K' },
    { label: '$250K to $500K', value: '250Kto500K' },
    { label: '$500K to $1M', value: '500Kto1M' },
    { label: 'Over $1M', value: 'over1M' },
    { label: 'No Enterprise', value: 'noEnterprise' },
  ];

  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const years = Array.from(
    { length: 20 },
    (_, i) => new Date().getFullYear() - i,
  );

  function handleCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    const category = categories[name as keyof typeof categories];
    setFormState({
      ...formState,
      categoryState: { ...formState.categoryState, [category]: value },
    });
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Submit Kitchen Outcomes</h1>
      <p>
        Some description of the kitchen outcomes form: Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <h3>Intro</h3>
      <p>
        Intro section description: Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.{' '}
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-email"
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
          label="Email"
          variant="outlined"
          fullWidth
          required
        />
      </Box>
      <h4>Organization and Responder Details</h4>
      <h5>Share Survey</h5>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select an Option</FormLabel>
        <RadioGroup
          aria-label="yes-no"
          name="yesNo"
          value={formState.shareSurvey ? 'yes' : 'no'}
          onChange={(e) => {
            setFormState({
              ...formState,
              shareSurvey: e.target.value === 'yes',
            });
          }}
          row
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          onChange={(e) =>
            setFormState({ ...formState, organizationName: e.target.value })
          }
          label="Organization Name"
          variant="outlined"
          fullWidth
          required
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          onChange={(e) =>
            setFormState({ ...formState, responderName: e.target.value })
          }
          label="Responder's Name"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          onChange={(e) =>
            setFormState({ ...formState, responderTitle: e.target.value })
          }
          label="Responder's Title"
          variant="outlined"
          fullWidth
        />
      </Box>
      <h4>Hunger Relief Impact Funding</h4>
      <p>
        Hunger Relief Meals ServedTotal number of meals prepared for low income
        individuals in 2023 by your organization.Hunger Relief Meals are
        prepared meals - hot, cold or frozen and ready-to-eat or reheat - anddo
        not include grocery/pantry boxes. Meal kits, specific boxed mix of
        perishable and non-perishable ingredients with recipes, (e.g. “Blue
        Apron style”), are included in communitymeals. Include all prepared
        meals whether sold on contract or funded through grants orfundraising.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Hunger Relief Meals Served"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) =>
            setFormState({
              ...formState,
              noMealsServerd: Number(e.target.value),
            })
          }
        />
      </Box>

      <p>
        Which types of meals are served through your hunger relief operations?
        Please check all that apply
      </p>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Meal Services Provided</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    mealTypes: {
                      ...formState.mealTypes,
                      childCare: e.target.checked,
                    },
                  });
                }}
                name="childcareMeals"
              />
            }
            label="Childcare Meals"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    mealTypes: {
                      ...formState.mealTypes,
                      school: e.target.checked,
                    },
                  });
                }}
                name="schoolMeals"
              />
            }
            label="School Meals"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    mealTypes: {
                      ...formState.mealTypes,
                      soupKitchen: e.target.checked,
                    },
                  });
                }}
                name="soupKitchen"
              />
            }
            label="Soup Kitchen (onsite)"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    mealTypes: {
                      ...formState.mealTypes,
                      shelter: e.target.checked,
                    },
                  });
                }}
                name="shelterMeals"
              />
            }
            label="Shelter Meals (offsite)"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    mealTypes: {
                      ...formState.mealTypes,
                      transitionalHousing: e.target.checked,
                    },
                  });
                }}
                name="supportiveHousingMeals"
              />
            }
            label="Meals for Supportive/Transitional Housing"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    mealTypes: {
                      ...formState.mealTypes,
                      senior: e.target.checked,
                    },
                  });
                }}
                name="seniorMeals"
              />
            }
            label="Meals For Seniors"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    mealTypes: {
                      ...formState.mealTypes,
                      medical: e.target.checked,
                    },
                  });
                }}
                name="medicallyTailoredMeals"
              />
            }
            label="Medically Tailored Meals"
          />
        </FormGroup>
      </FormControl>

      <h4>Contract Meal Revenue</h4>
      <p>
        Total combined gross revenue in {new Date().getFullYear()} from all
        contract meal enterprises. Do not includedonated goods or revenue from
        retail foodservice social enterprises. Retail SE data iscollected later
        in the survey
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Contract Meal Revenue"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              contractMealRevenue: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Cost per Meal</h4>
      <p>
        What is the average cost to produce a meal (total cost of goods, labor,
        and overhead/totalmeals produced)?
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Cost per Meal"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              costPerMeal: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Food Cost Percent</h4>
      <p>
        What is the food cost % for your hunger relief meals? Do not include the
        value of donatedand recovered food in your food cost calculation
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Food Cost Percent"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              foodCostPercentage: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Meal Reimbursement</h4>
      <p>
        Of meals that you get direct reimbursement for, what is your Average
        Reimbursement permeal? This should be your average rate across all
        contracts, public and private. Estimate is OK.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Meal Reimbursement"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealReimbursement: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Hunger Relief Meal Funding Mix</h4>
      <p>
        Please estimate what percentage of your Hunger Relief Meal Fundingcomes
        from each of the following categories. This can be a roughestimate, but
        the three numbers should total 100. Public fundingincludes all
        government grants and contracts. Individual donations and In kind
        contributionsshould beincluded in Private Donations
      </p>

      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% from public/gov't contracts & grants"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealFunding: {
                ...formState.mealFunding,
                publicFunding: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% from private contracts"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealFunding: {
                ...formState.mealFunding,
                privateContracts: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% from private donations & philanthropy"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              mealFunding: {
                ...formState.mealFunding,
                privateDonations: Number(e.target.value),
              },
            });
          }}
        />
      </Box>

      <h3>Hunger Relief Demographics</h3>
      <h4>Gender</h4>
      <p>
        Please provide an estimate if exact data is not available. Leave blank
        if you do not track.NOTE: The language below often mirrors language from
        census categories and governmentdefinitions. If there is preferred
        language or terminology we should use when referring to yourprogram and
        clients, please let us know by emailing info@catalystkitchens.org. All
        comments are welcome.
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Female"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              gender: { ...formState.gender, female: Number(e.target.value) },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Male"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              gender: { ...formState.gender, male: Number(e.target.value) },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Non-binary"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              gender: {
                ...formState.gender,
                nonBinary: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Gender Unknown"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              gender: { ...formState.gender, unknown: Number(e.target.value) },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Transgender"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              gender: {
                ...formState.gender,
                transgender: Number(e.target.value),
              },
            });
          }}
        />
      </Box>

      <h4>Race and Ethnicity</h4>
      <p>
        Please provide estimate if exact data is not available. If you do not
        collect race/ethnicity dataplease leave blank
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% American Indian or Alaska Native"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              race: {
                ...formState.race,
                americanIndian: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Asian or Asian American"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              race: {
                ...formState.race,
                asian: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Black or African American"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              race: {
                ...formState.race,
                black: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Latina, Latino, or Latinx"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              race: {
                ...formState.race,
                latinx: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Native Hawaiian or Pacific Islander"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              race: {
                ...formState.race,
                pacificIslander: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Multiracial"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              race: {
                ...formState.race,
                multiracial: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% White"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              race: {
                ...formState.race,
                white: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Other Race"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              race: {
                ...formState.race,
                other: Number(e.target.value),
              },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Race Unknown"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              race: {
                ...formState.race,
                unknown: Number(e.target.value),
              },
            });
          }}
        />
      </Box>

      <h4>Age Groups</h4>
      <p>
        Please provide estimate if exact data is not available. If you do not
        collect age data please leaveblank
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Infants (0-4)"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              age: { ...formState.age, infants: Number(e.target.value) },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Children/Youth (5-18)"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              age: { ...formState.age, children: Number(e.target.value) },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Adults (19-64)"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              age: { ...formState.age, adults: Number(e.target.value) },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Seniors (65+)"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              age: { ...formState.age, seniors: Number(e.target.value) },
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="% Age Unknown"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              age: { ...formState.age, unknown: Number(e.target.value) },
            });
          }}
        />
      </Box>
      <h4>Capital Expansion Projects</h4>
      <p>
        Do you have any capital expansion projects related to your foodservice
        operations or workforce training program? Select the response that best
        describes the current state of any expansion plan
      </p>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Capital Expansion Project Status
        </FormLabel>
        <RadioGroup
          name="capitalExpansionProject"
          value={formState.capitalExpansionProject}
          onChange={(e) =>
            setFormState({
              ...formState,
              capitalExpansionProject: e.target.value,
            })
          }
        >
          <FormControlLabel
            value="earlyStages"
            control={<Radio />}
            label="We are in early stages of planning a capital expansion"
          />
          <FormControlLabel
            value="fundraising"
            control={<Radio />}
            label="We have a capital expansion plan and are fundraising"
          />
          <FormControlLabel
            value="fullyFunded"
            control={<Radio />}
            label="We have a fully funded capital expansion plan"
          />
          <FormControlLabel
            value="completed"
            control={<Radio />}
            label="We have recently completed or will soon complete the project"
          />
          <FormControlLabel
            value="noPlans"
            control={<Radio />}
            label="We have no future plans or projects underway"
          />
        </RadioGroup>
      </FormControl>

      <h4>Capital Project Size</h4>
      <p>
        What is the size in dollars of the project plan or completed project
        referenced above, regardless of the current state of the project?
        Estimate is OK
      </p>
      <Box mb={2}>
        <TextField
          id="outlined-basic"
          label="Capital Project Size"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => {
            setFormState({
              ...formState,
              capitalProjectSize: Number(e.target.value),
            });
          }}
        />
      </Box>

      <h4>Capital Project Date</h4>
      <p>
        What is the projected month and year by which you want to have this
        project completed? Estimate is OK.
      </p>
      <div>
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">
            Capital Expansion Project Status
          </FormLabel>
          <RadioGroup
            name="capitalExpansionProject"
            value={formState.capitalExpansionProject}
            onChange={(e) =>
              setFormState({
                ...formState,
                capitalExpansionProject: e.target.value,
              })
            }
          >
            <FormControlLabel
              value="earlyStages"
              control={<Radio />}
              label="We are in early stages of planning a capital expansion"
            />
            <FormControlLabel
              value="fundraising"
              control={<Radio />}
              label="We have a capital expansion plan and are fundraising"
            />
            <FormControlLabel
              value="fullyFunded"
              control={<Radio />}
              label="We have a fully funded capital expansion plan"
            />
            <FormControlLabel
              value="completed"
              control={<Radio />}
              label="We have recently completed or will soon complete the project"
            />
            <FormControlLabel
              value="noPlans"
              control={<Radio />}
              label="We have no future plans or projects underway"
            />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Month</InputLabel>
          <Select
            label="Month"
            value={formState.capitalExpansionMonth}
            onChange={(e) =>
              setFormState({
                ...formState,
                capitalExpansionMonth: e.target.value,
              })
            }
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Year</InputLabel>
          <Select
            label="Year"
            value={formState.capitalExpansionYear}
            onChange={(e) =>
              setFormState({
                ...formState,
                capitalExpansionYear: parseInt(e.target.value.toString(), 10),
              })
            }
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <h4>Capital Expansion Project Needs</h4>
      <p>
        What support do you need in planning or executing your capital expansion
        project? Checkall that apply
      </p>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Select the forms of support you need
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    expansionProjectNeeds: {
                      ...formState.expansionProjectNeeds,
                      howStart: e.target.checked,
                    },
                  });
                }}
                name="howStart"
              />
            }
            label="How do I even start?"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    expansionProjectNeeds: {
                      ...formState.expansionProjectNeeds,
                      planCost: e.target.checked,
                    },
                  });
                }}
                name="planCost"
              />
            }
            label="Planning Cost Expenses"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    expansionProjectNeeds: {
                      ...formState.expansionProjectNeeds,
                      constructionCosts: e.target.checked,
                    },
                  });
                }}
                name="constructionCosts"
              />
            }
            label="Contruction Costs"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    expansionProjectNeeds: {
                      ...formState.expansionProjectNeeds,
                      fundraisingStrat: e.target.checked,
                    },
                  });
                }}
                name="fundraisingStrat"
              />
            }
            label="Creating fundraising strategy"
          />
        </FormGroup>
      </FormControl>

      <h2>Retail Social Enterprise Outcomes</h2>
      <Box p={2}>
        <Typography variant="body1" gutterBottom>
          In the following sections, we will ask you to please share data about
          your retail food service enterprises. You will need to know the gross
          annual revenue from each of your food enterprises. The types of
          enterprise are grouped into the following categories. If one of your
          enterprise types is not represented below, please include it in the
          most relevant available category.
        </Typography>
        <ol>
          <li>
            <Typography variant="body1">
              <strong>CAFE</strong> -- Food prepared on site with counter
              service; a limited number of items are made to order. Food may be
              consumed on or off premises.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>RESTAURANT</strong> -- Food prepared onsite with most
              items prepared to order and predominantly intended for on-premise
              consumption. Orders typically taken at the table though not
              required.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>CATERING</strong> -- On or offsite catering; DO NOT report
              catering data which are part of a café or restaurant and included
              in totals above.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>FOOD TRUCK</strong> -- Retail or free meal service
              prepared and served from a mobile kitchen.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>CONSUMER PACKAGED GOODS</strong> -- Prepared and/or
              packaged food and beverages sold to third-party resellers or
              direct to public. Include ready-to-eat foods and products can be
              branded or not branded.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>FOOD OR MEAL SUBSCRIPTION SERVICES</strong> -- Prepared
              and/or packaged meals sold at retail prices to individuals or
              families at regular intervals such as weekly or monthly pickups or
              deliveries (e.g., in the style of Blue Apron or other analogous
              services).
            </Typography>
          </li>
        </ol>
      </Box>

      <h4>Retail Social Enterprise Revenue</h4>
      <p>
        Total combined gross revenue in 2023 from all foodservice social
        enterprises, excluding contract hunger relief
      </p>
      <Box mb={2}>
        <TextField
          id="retail-social-enterprise-revenue"
          onChange={(e) =>
            setFormState({
              ...formState,
              retailSocialEnterpriseRevenue: Number(e.target.value),
            })
          }
          label="retailSocialEnterpriseReveue"
          variant="outlined"
          fullWidth
          required
        />
      </Box>

      <h4>Gross Revenue, Retail Social Enterprise</h4>
      <p>description</p>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            {revenueRanges.map((range) => (
              <TableCell key={range.value}>{range.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(categories).map((category) => (
            <TableRow key={category}>
              <TableCell>{category}</TableCell>
              {revenueRanges.map((range) => (
                <TableCell key={range.value}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label={category}
                      name={category}
                      value={
                        formState.categoryState[categories[category]] || ''
                      }
                      // eslint-disable-next-line react/jsx-no-bind
                      onChange={handleCategoryChange}
                    >
                      <FormControlLabel
                        value={range.value}
                        control={<Radio />}
                        label=""
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          paddingBottom: '32px',
        }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: '#2C2C2C',
            color: '#F5F5F5',
            width: '100%',
          }}
          onClick={() => console.log(formState)}
        >
          Submit Kitchen Data
        </Button>
      </div>
    </div>
  );
}
