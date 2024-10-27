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
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getData } from '../util/api';

function KitchenOutcomeViz() {
  // create type for kitchenOutcomeData
  interface SurveyData {
    org_id: string;
    year: Date;
    shareSurvey?: 'Yes' | 'No';
    organizationName: string;
    responderName: string;
    responderTitle: string;
    hungerReliefsMealsServed?: number;
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

  const [orgName, setOrgName] = useState('');
  const [year, setYear] = useState<number | ''>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!year || !orgName) {
      alert('Please enter both organization name and year.');
      return;
    }

    try {
      const response = await getData(`kitchen_outcomes/${year}/${orgName}`);
      setSurveyData(response.data);
      console.log(response.data);
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
    <div>
      <h1>Kitchen Outcome Viz</h1>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <TextField
            label="Organization Name"
            variant="outlined"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
          <TextField
            label="Year"
            type="number"
            variant="outlined"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
          <Button type="submit" variant="contained" color="primary">
            Get Data
          </Button>
        </Box>
      </Container>
      <div>
        <Doughnut data={chartData} options={options} />
      </div>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Important Figures</Typography>
            <Typography> Cost per Meal: {surveyData?.costPerMeal}</Typography>
            <Typography>
              {' '}
              Food Cost Percentage: {surveyData?.foodCostPercentage}{' '}
            </Typography>
            <Typography>
              {' '}
              Meal Reimbursement: {surveyData?.mealReimbursement}
            </Typography>
            <Typography>
              {' '}
              Hunger Relief Meals Served: {surveyData?.hungerReliefsMealsServed}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default KitchenOutcomeViz;
