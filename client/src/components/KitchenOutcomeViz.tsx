import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  MenuItem,
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getData } from '../util/api';

function KitchenOutcomesVisualization() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue);
  };
  interface SurveyData {
    org_id: string;
    year: Date;
    shareSurvey?: 'Yes' | 'No';
    organizationName: string;
    responderName: string;
    responderTitle: string;
    hungerReliefMealsServed?: number;
    typeOfMealsServed?:
      | 'Childcare Meals'
      | 'School Meals'
      | 'Soup Kitchen (onsite)'
      | 'Shelter Meals (offsite)'
      | 'Meals for Supportive/Transitional Housing'
      | 'Meals For Seniors'
      | 'Medically Tailored Meals';
    costPerMeal?: number;
    foodCostPercentage?: number;
    mealReimbursement?: number;
    mealFundingPublic?: number;
    mealFundingPrivateContracts?: number;
    mealFundingPrivateDonations?: number;
    mealsFemale?: number;
    mealsMale?: number;
    mealsNonBinary?: number;
    mealsGenderUnknown?: number;
    mealsTransgender?: number;
    mealsAmericanIndian?: number;
    mealsAsian?: number;
    mealsBlack?: number;
    mealsLatinx?: number;
    mealsNativeHawaiian?: number;
    mealsMultiRacial?: number;
    mealsWhite?: number;
    mealsOtherRace?: number;
    mealsRaceUnknown?: number;
    mealsInfants?: number;
    mealsChildren?: number;
    mealsAdults?: number;
    mealsSeniors?: number;
    mealsAgeUnknown?: number;
    capitalExpansionProjects?:
      | 'We are in early stages of planning a capital expansion'
      | 'We have a capital expansion plan and are fundraising'
      | 'We have a fully funded capital expansion plan'
      | 'We have recently completed or will soon complete the project'
      | 'We have no future plans or projects underway';
    capitalProjectSize?: number;
    capitalProjectDate?: Date;
    capitalExpansionProjectNeeds?:
      | 'How do we even start?'
      | 'Planning cost expenses'
      | 'Creating fundraising strategy'
      | 'Construction costs'
      | 'Equipment (heavy or small)'
      | 'Operating expenses'
      | 'Other';
    retailSocialEnterpriseRevenue?: number;
    grossRevenueCafe?:
      | 'Less than $100K'
      | '$100K to $250K'
      | '$250K to $500K'
      | '$500K to $1M'
      | 'Over $1M'
      | 'No Enterprise';
    grossRevenueRestaurant?:
      | 'Less than $100K'
      | '$100K to $250K'
      | '$250K to $500K'
      | '$500K to $1M'
      | 'Over $1M'
      | 'No Enterprise';
    grossRevenueCatering?:
      | 'Less than $100K'
      | '$100K to $250K'
      | '$250K to $500K'
      | '$500K to $1M'
      | 'Over $1M'
      | 'No Enterprise';
    grossRevenueFoodTruck?:
      | 'Less than $100K'
      | '$100K to $250K'
      | '$250K to $500K'
      | '$500K to $1M'
      | 'Over $1M'
      | 'No Enterprise';
    grossRevenueWholesale?:
      | 'Less than $100K'
      | '$100K to $250K'
      | '$250K to $500K'
      | '$500K to $1M'
      | 'Over $1M'
      | 'No Enterprise';
    grossRevenueFoodSubscription?:
      | 'Less than $100K'
      | '$100K to $250K'
      | '$250K to $500K'
      | '$500K to $1M'
      | 'Over $1M'
      | 'No Enterprise';
  }

  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  const [orgList, setOrgList] = useState<string[] | null>(null);
  const [yearList, setYearList] = useState<number[]>([]);

  const [orgName, setOrgName] = useState('');
  const [year, setYear] = useState<number | ''>('');

  const tabNames = [
    'Hunger Relief',
    'Social Enterprise',
    'Capital Projects',
    'Organization Info',
  ];

  useEffect(() => {
    const fetchOrgList = async () => {
      try {
        const response = await getData(`kitchen_outcomes/organizations`);
        setOrgList(response.data);
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };

    fetchOrgList();
  }, []);

  useEffect(() => {
    const fetchOutcomes = async () => {
      try {
        const response = await getData(`kitchen_outcomes/${year}/${orgName}`);
        setSurveyData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOutcomes();
  }, [orgName, year]);

  const handleOrgSelection = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const selectedOrg = event.target.value;
    setOrgName(selectedOrg);

    try {
      const response = await getData(
        `kitchen_outcomes/get/years/${selectedOrg}`,
      );
      setYearList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }[];
  }>({
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Age Distribution',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
      {
        label: 'Race Distribution',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  });

  useEffect(() => {
    // Update chartData when surveyData changes
    if (surveyData) {
      setChartData({
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'Age Distribution',
            data: [
              surveyData?.mealsInfants ?? 0,
              surveyData?.mealsChildren ?? 0,
              surveyData?.mealsAdults ?? 0,
              surveyData?.mealsSeniors ?? 0,
              surveyData?.mealsAgeUnknown ?? 0,
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
          {
            label: 'Race Distribution',
            data: [
              surveyData?.mealsAmericanIndian ?? 0,
              surveyData?.mealsAsian ?? 0,
              surveyData?.mealsBlack ?? 0,
              surveyData?.mealsLatinx ?? 0,
              surveyData?.mealsNativeHawaiian ?? 0,
              surveyData?.mealsMultiRacial ?? 0,
              surveyData?.mealsWhite ?? 0,
              surveyData?.mealsOtherRace ?? 0,
              surveyData?.mealsRaceUnknown ?? 0,
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      });
    }
  }, [surveyData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="left" sx={{ my: 4 }}>
        Kitchen Outcomes Visualization
      </Typography>

      {/* Year and Organization Selectors */}
      <Grid
        container
        spacing={2}
        justifyContent="left"
        style={{ marginBottom: '20px' }}
      >
        <Grid item xs={3}>
          <TextField
            label="Organization"
            variant="outlined"
            select
            fullWidth
            value={orgName}
            onChange={handleOrgSelection}
          >
            {orgList?.map((org) => (
              <MenuItem key={org} value={org}>
                {org}
              </MenuItem>
            )) ?? []}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Year"
            variant="outlined"
            select
            fullWidth
            value={year}
            onChange={(event) => {
              setYear(Number(event.target.value));
            }}
            disabled={!orgName || yearList.length === 0} // Disable if no organization is selected
          >
            {yearList.map((availableYear) => (
              <MenuItem key={availableYear} value={availableYear}>
                {availableYear}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Box
        sx={{
          backgroundColor: '#555',
          padding: '4px',
          borderRadius: '8px',
          width: '80%',
          marginLeft: '0',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth" // Tabs take full width within the container
          sx={{
            '.MuiTabs-flexContainer': {
              gap: 1, // Spacing between tabs
              backgroundColor: '#555',
            },
          }}
          TabIndicatorProps={{
            style: {
              display: 'none', // Hide default underline indicator
            },
          }}
        >
          {[...tabNames].map((name, index) => (
            <Tab
              key={name}
              label={name}
              sx={{
                color: tabValue === index ? 'black' : 'white',
                backgroundColor: tabValue === index ? 'white' : '#555',
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: tabValue === index ? 'bold' : 'normal',
                '&.Mui-selected': {
                  color: 'black', // Ensures selected text is black
                },
                '&:hover': {
                  backgroundColor: '#999',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      {/* Content for each tab */}
      <Box sx={{ padding: 2 }}>
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6">Hunger Relief</Typography>
            <div>
              <Doughnut data={chartData} options={options} />
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Important Figures</Typography>
                    <Typography>
                      {' '}
                      Cost per Meal: {surveyData?.costPerMeal}
                    </Typography>
                    <Typography>
                      {' '}
                      Food Cost Percentage: {
                        surveyData?.foodCostPercentage
                      }{' '}
                    </Typography>
                    <Typography>
                      {' '}
                      Meal Reimbursement: {surveyData?.mealReimbursement}
                    </Typography>
                    <Typography>
                      {' '}
                      Hunger Relief Meals Served:{' '}
                      {surveyData?.hungerReliefMealsServed}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </div>
          </Box>
        )}
        {tabValue === 1 && (
          <Box>
            <Typography variant="h6">Social Enterprise</Typography>
            {/* Add content for Social Enterprise */}
          </Box>
        )}
        {tabValue === 2 && (
          <Box>
            <Typography variant="h6">Capital Projects</Typography>
            {/* Add content for Capital Projects */}
          </Box>
        )}
        {tabValue === 3 && (
          <Box>
            <Typography variant="h6">Organization Info</Typography>
            {/* Add content for Organization Info */}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default KitchenOutcomesVisualization;

// create type for kitchenOutcomeData
