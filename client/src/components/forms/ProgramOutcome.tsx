import React, { useState } from 'react';
import {
  Button,
  Box,
  Checkbox,
  Radio,
  Grid,
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

export default function ProgramOutcome() {
  enum YouthEnrollmentStructure {
    Staggered = 'Staggered',
    Single = 'Single',
    Both = 'Both',
  }
  type FormState = {
    emailAddress: string;
    shareSurvey: boolean;
    organizationName: string;
    responderName: string;
    responderTitle: string;
    programCostPerTrainee: number;
    youthProgram: boolean;
    youthTrained?: number;
    youthProgramRetentionRate?: number;
    youthPositiveOutcomes?: number;
    youthWage?: number;
    youthJobRetention3Months?: number;
    youthJobRetention6Months?: number;
    youthJobRetention12Months?: number;
    youthJobRetention2Years?: number;
    youthProgramWeeks?: number;
    youthProgramHours?: number;
    youthEnrollmentStructure?: YouthEnrollmentStructure;
    youthCompensation?: 'Hourly' | 'Stipend' | 'None';
    youthTrainedDefinition?:
      | 'The first day of program'
      | '2-4 day provisional period'
      | 'One week provisional period'
      | 'Two week provisional period';
    youthGraduatedDefinition?:
      | 'All weeks of program'
      | 'Early exit for employment allowed'
      | 'Other';
    measureYouthOutcomes?: (
      | 'High School Graduation'
      | 'Return to School'
      | 'Family Reunification'
      | 'Non-Recidivism'
      | 'Stable Housing'
      | 'Other'
    )[];
    adultProgram: boolean;
    adultsTrained?: number;
    adultsGraduated?: number;
    adultsPositiveOutcome?: number;
    adultsJobPlacementGraduates?: number;
    adultsWage?: number;
    adultsJobRetention3Months?: number;
    adultsJobRetention6Months?: number;
    adultsWage6Months?: number;
    adultsJobRetention12Months?: number;
    adultsWage12Months?: number;
    adultsJobRetention24Months?: number;
    adultsWage24Months?: number;
    adultProgramWeeks?: number;
    adultProgramHours?: number;
    adultsEnrollmentStructure?: 'Single Cohort' | 'Staggered';
    adultsCompensation?: 'Hourly' | 'Stipend' | 'None';
    adultTrainedDefinition?:
      | 'The first day of program'
      | '2-4 day provisional period'
      | 'One week provisional period'
      | 'Two week provisional period'
      | 'Other';
    traineesAge?: number;
    traineesPercentFemale?: number;
    traineesPercentMale?: number;
    traineesPercentNonBinary?: number;
    traineesPercentTransgender?: number;
    traineesPercentAmericanIndian?: number;
    traineesPercentAsian?: number;
    traineesPercentBlack?: number;
    traineesPercentLatinx?: number;
    traineesPercentNativeHawaiian?: number;
    traineesPercentMultiRacial?: number;
    traineesPercentWhite?: number;
    traineesPercentOtherRace?: number;
    traineesPercentRaceUnknown?: number;
    barrierReturningCitizens?: number;
    barrierPhysicalDisability?: number;
    barrierIntellectualDisability?: number;
    barrierUnhoused?: number;
    barrierMentalHealth?: number;
    barrierNewAmericans?: number;
    barrierInRecovery?: number;
    barrierVeteran?: number;
    wrapAroundHousing?: 'Partner agency' | 'In-house' | 'Not provided';
    wrapAroundLifeSkills?: 'Partner agency' | 'In-house' | 'Not provided';
    wrapAroundCaseManagement?: 'Partner agency' | 'In-house' | 'Not provided';
    wrapAroundJobSearch?: 'Partner agency' | 'In-house' | 'Not provided';
    wrapAroundRecoveryTreatment?:
      | 'Partner agency'
      | 'In-house'
      | 'Not provided';
    wrapAroundMentalHealthServices?:
      | 'Partner agency'
      | 'In-house'
      | 'Not provided';
    wrapAroundHealthcare?: 'Partner agency' | 'In-house' | 'Not provided';
    wrapAroundChildcare?: 'Partner agency' | 'In-house' | 'Not provided';
    wrapAroundTransportation?: 'Partner agency' | 'In-house' | 'Not provided';
    otherWrapAroundServices?: string;
    fundingPublic?: number;
    fundingPrivate?: number;
    fundingSocialEnterprise?: number;
    snapET?: 'Yes' | 'No But' | 'No And';
    wioa?: 'Yes' | 'No But' | 'No And';
    curriculum?: 'All' | 'Part';
    programCertifications?: (
      | 'ACF Quality/Approved Program'
      | 'DOL approved apprenticeship'
      | 'State Association apprenticeship'
      | 'Local or State Dept. of Education or Community College'
      | 'Other'
    )[];
    otherProgramCertifications?: string;
    participantCertifications?: (
      | 'Basic Food Safety'
      | 'Advanced Food Safety'
      | 'Credit toward Comm College'
      | 'ACF Certification'
      | 'NRA'
      | 'AHLEI'
      | 'Other'
    )[];
    otherParticipantCertifications?: string;
    internshipOrExternship?: boolean;
    internshipDescription?: string;
    minimumWage2023?: number;
    jobTypeFoodService?: '1-25%' | '26-50%' | '51-75%' | '76-100%';
    jobCategory?:
      | 'Food Service: restaurant, cafe'
      | 'Food Service: institutional'
      | 'Food Service: grocery'
      | 'Customer Service and Retail'
      | 'Transportation & warehousing'
      | 'Healthcare & social assistance'
      | 'Safety & maintenance'
      | 'Construction'
      | 'Other';
    alumniHiredByOrg?: number;
  };
  const [formState, setFormState] = React.useState<FormState>({
    emailAddress: '',
    shareSurvey: false,
    organizationName: '',
    responderName: '',
    responderTitle: '',
    programCostPerTrainee: 0.0,
    youthProgram: false,
    youthTrained: undefined,
    youthProgramRetentionRate: undefined,
    youthPositiveOutcomes: undefined,
    youthWage: undefined,
    youthJobRetention3Months: undefined,
    youthJobRetention6Months: undefined,
    youthJobRetention12Months: undefined,
    youthJobRetention2Years: undefined,
    youthProgramWeeks: undefined,
    youthProgramHours: undefined,
    youthEnrollmentStructure: undefined,
    youthCompensation: undefined,
    youthTrainedDefinition: undefined,
    youthGraduatedDefinition: 'All weeks of program',
    measureYouthOutcomes: [], // Empty array for multiple choice
    adultProgram: false,
    adultsTrained: undefined,
    adultsGraduated: undefined,
    adultsPositiveOutcome: undefined,
    adultsJobPlacementGraduates: undefined,
    adultsWage: undefined,
    adultsJobRetention3Months: undefined,
    adultsJobRetention6Months: undefined,
    adultsWage6Months: undefined,
    adultsJobRetention12Months: undefined,
    adultsWage12Months: undefined,
    adultsJobRetention24Months: undefined,
    adultsWage24Months: undefined,
    adultProgramWeeks: undefined,
    adultProgramHours: undefined,
    adultsEnrollmentStructure: undefined,
    adultsCompensation: undefined,
    adultTrainedDefinition: undefined,
    traineesAge: undefined,
    traineesPercentFemale: undefined,
    traineesPercentMale: undefined,
    traineesPercentNonBinary: undefined,
    traineesPercentTransgender: undefined,
    traineesPercentAmericanIndian: undefined,
    traineesPercentAsian: undefined,
    traineesPercentBlack: undefined,
    traineesPercentLatinx: undefined,
    traineesPercentNativeHawaiian: undefined,
    traineesPercentMultiRacial: undefined,
    traineesPercentWhite: undefined,
    traineesPercentOtherRace: undefined,
    traineesPercentRaceUnknown: undefined,
    barrierReturningCitizens: undefined,
    barrierPhysicalDisability: undefined,
    barrierIntellectualDisability: undefined,
    barrierUnhoused: 0,
    barrierMentalHealth: 0,
    barrierNewAmericans: 0,
    barrierInRecovery: 0,
    barrierVeteran: 0,
    wrapAroundHousing: undefined,
    wrapAroundLifeSkills: undefined,
    wrapAroundCaseManagement: undefined,
    wrapAroundJobSearch: undefined,
    wrapAroundRecoveryTreatment: undefined,
    wrapAroundMentalHealthServices: undefined,
    wrapAroundHealthcare: undefined,
    wrapAroundChildcare: undefined,
    wrapAroundTransportation: undefined,
    otherWrapAroundServices: '',
    fundingPublic: undefined,
    fundingPrivate: undefined,
    fundingSocialEnterprise: undefined,
    snapET: undefined,
    wioa: undefined,
    curriculum: undefined,
    programCertifications: [], // Empty array for multiple choice
    otherProgramCertifications: undefined,
    participantCertifications: [], // Empty array for multiple choice
    otherParticipantCertifications: undefined,
    internshipOrExternship: false,
    internshipDescription: undefined,
    minimumWage2023: undefined,
    jobTypeFoodService: undefined,
    jobCategory: undefined,
    alumniHiredByOrg: undefined,
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Submit Program Outcomes</h1>
      <p>
        Please fill out the following form to submit your program outcomes for
        Catalyst Kitchen analysis
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
            setFormState({ ...formState, emailAddress: e.target.value })
          }
          label="Email"
          variant="outlined"
          fullWidth
          required
        />
      </Box>
      <Box mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formState.shareSurvey}
              onChange={(e) =>
                setFormState({ ...formState, shareSurvey: e.target.checked })
              }
            />
          }
          label="Share Survey"
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-organization-name"
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
          id="outlined-responder-name"
          onChange={(e) =>
            setFormState({ ...formState, responderName: e.target.value })
          }
          label="Responder Name"
          variant="outlined"
          fullWidth
          required
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-responder-title"
          onChange={(e) =>
            setFormState({ ...formState, responderTitle: e.target.value })
          }
          label="Responder Title"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          id="outlined-program-cost-per-trainee"
          type="number"
          onChange={(e) =>
            setFormState({
              ...formState,
              programCostPerTrainee: Number(e.target.value),
            })
          }
          label="Program Cost Per Trainee"
          variant="outlined"
          fullWidth
          required
        />
      </Box>
      <Box mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formState.youthProgram}
              onChange={(e) =>
                setFormState({ ...formState, youthProgram: e.target.checked })
              }
            />
          }
          label="Youth Program"
        />
      </Box>
      {formState.youthProgram && (
        <div id="youthProgramFields">
          <Box mb={2}>
            <TextField
              id="outlined-youth-trained"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthTrained: Number(e.target.value),
                })
              }
              label="Youth Trained"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="outlined-youth-program-retention-rate"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthProgramRetentionRate: Number(e.target.value),
                })
              }
              label="Youth Program Retention Rate"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="outlined-youth-positive-outcomes"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthPositiveOutcomes: Number(e.target.value),
                })
              }
              label="Youth Positive Outcomes"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="outlined-youth-wage"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthWage: Number(e.target.value),
                })
              }
              label="Youth Wage"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="outlined-youth-job-retention-3-months"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthJobRetention3Months: Number(e.target.value),
                })
              }
              label="Youth Job Retention (3 Months)"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="outlined-youth-job-retention-6-months"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthJobRetention6Months: Number(e.target.value),
                })
              }
              label="Youth Job Retention (6 Months)"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="outlined-youth-job-retention-12-months"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthJobRetention12Months: Number(e.target.value),
                })
              }
              label="Youth Job Retention (12 Months)"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="outlined-youth-job-retention-2-years"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthJobRetention2Years: Number(e.target.value),
                })
              }
              label="Youth Job Retention (2 Years)"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="outlined-youth-program-weeks"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthProgramWeeks: Number(e.target.value),
                })
              }
              label="Youth Program Weeks"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="outlined-youth-program-hours"
              type="number"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  youthProgramHours: Number(e.target.value),
                })
              }
              label="Youth Program Hours"
              variant="outlined"
              fullWidth
            />
          </Box>
          {/* Youth Enrollment Structure */}
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="youth-enrollment-structure-label">
                Youth Enrollment Structure
              </InputLabel>
              <Select
                labelId="youth-enrollment-structure-label"
                value={formState.youthEnrollmentStructure || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    youthEnrollmentStructure: e.target
                      .value as YouthEnrollmentStructure,
                  });
                }}
                label="Youth Enrollment Structure"
              >
                <MenuItem value={YouthEnrollmentStructure.Staggered}>
                  Staggered
                </MenuItem>
                <MenuItem value={YouthEnrollmentStructure.Single}>
                  Single
                </MenuItem>
                <MenuItem value={YouthEnrollmentStructure.Both}>Both</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Youth Compensation */}
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="youth-compensation-label">
                Youth Compensation
              </InputLabel>
              <Select
                labelId="youth-compensation-label"
                value={formState.youthCompensation || ''}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    youthCompensation: e.target.value as
                      | 'Hourly'
                      | 'Stipend'
                      | 'None'
                      | undefined,
                  })
                }
                label="Youth Compensation"
              >
                <MenuItem value="Hourly">Hourly</MenuItem>
                <MenuItem value="Stipend">Stipend</MenuItem>
                <MenuItem value="None">None</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="youth-trained-definition-label">
                Youth Trained Definition
              </InputLabel>
              <Select
                labelId="youth-trained-definition-label"
                value={formState.youthTrainedDefinition || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    youthTrainedDefinition: e.target
                      .value as keyof (typeof formState)['youthTrainedDefinition'],
                  });
                }}
                label="Youth Trained Definition"
              >
                <MenuItem value="The first day of program">
                  The first day of program
                </MenuItem>
                <MenuItem value="2-4 day provisional period">
                  2-4 day provisional period
                </MenuItem>
                <MenuItem value="One week provisional period">
                  One week provisional period
                </MenuItem>
                <MenuItem value="Two week provisional period">
                  Two week provisional period
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="youth-graduated-definition-label">
                Youth Graduated Definition
              </InputLabel>
              <Select
                labelId="youth-graduated-definition-label"
                value={formState.youthGraduatedDefinition || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    youthGraduatedDefinition: e.target
                      .value as keyof (typeof formState)['youthGraduatedDefinition'],
                  });
                }}
                label="Youth Graduated Definition"
              >
                <MenuItem value="All weeks of program">
                  All weeks of program
                </MenuItem>
                <MenuItem value="Early exit for employment allowed">
                  Early exit for employment allowed
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="measure-youth-outcomes-label">
                Measure Youth Outcomes
              </InputLabel>
              <Select
                labelId="measure-youth-outcomes-label"
                multiple
                value={formState.measureYouthOutcomes || []}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    measureYouthOutcomes: e.target.value as Array<
                      keyof (typeof formState)['measureYouthOutcomes']
                    >,
                  });
                }}
                renderValue={(selected) => selected.join(', ')}
                label="Measure Youth Outcomes"
              >
                <MenuItem value="High School Graduation">
                  High School Graduation
                </MenuItem>
                <MenuItem value="Return to School">Return to School</MenuItem>
                <MenuItem value="Family Reunification">
                  Family Reunification
                </MenuItem>
                <MenuItem value="Non-Recidivism">Non-Recidivism</MenuItem>
                <MenuItem value="Stable Housing">Stable Housing</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      )}
      <Box mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formState.adultProgram}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultProgram: e.target.checked,
                });
              }}
            />
          }
          label="Adult Program"
        />
      </Box>
      {formState.adultProgram && (
        <div id="adultProgramFields">
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Trained"
              value={formState.adultsTrained || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsTrained: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Graduated"
              value={formState.adultsGraduated || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsGraduated: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Positive Outcome"
              value={formState.adultsPositiveOutcome || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsPositiveOutcome: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Job Placement Graduates"
              value={formState.adultsJobPlacementGraduates || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsJobPlacementGraduates: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Wage"
              value={formState.adultsWage || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsWage: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Job Retention (3 Months)"
              value={formState.adultsJobRetention3Months || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsJobRetention3Months: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Job Retention (6 Months)"
              value={formState.adultsJobRetention6Months || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsJobRetention6Months: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Wage (6 Months)"
              value={formState.adultsWage6Months || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsWage6Months: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Job Retention (12 Months)"
              value={formState.adultsJobRetention12Months || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsJobRetention12Months: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Wage (12 Months)"
              value={formState.adultsWage12Months || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsWage12Months: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Job Retention (24 Months)"
              value={formState.adultsJobRetention24Months || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsJobRetention24Months: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adults Wage (24 Months)"
              value={formState.adultsWage24Months || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultsWage24Months: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adult Program Weeks"
              value={formState.adultProgramWeeks || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultProgramWeeks: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Adult Program Hours"
              value={formState.adultProgramHours || ''}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  adultProgramHours: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
                });
              }}
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="adults-enrollment-structure-label">
                Adults Enrollment Structure
              </InputLabel>
              <Select
                labelId="adults-enrollment-structure-label"
                value={formState.adultsEnrollmentStructure || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    adultsEnrollmentStructure: e.target.value as
                      | 'Single Cohort'
                      | 'Staggered'
                      | undefined,
                  });
                }}
                label="Adults Enrollment Structure"
              >
                <MenuItem value="Single Cohort">Single Cohort</MenuItem>
                <MenuItem value="Staggered">Staggered</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="adults-compensation-label">
                Adults Compensation
              </InputLabel>
              <Select
                labelId="adults-compensation-label"
                value={formState.adultsCompensation || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    adultsCompensation: e.target.value as
                      | 'Hourly'
                      | 'Stipend'
                      | 'None',
                  });
                }}
                label="Adults Compensation"
              >
                <MenuItem value="Hourly">Hourly</MenuItem>
                <MenuItem value="Stipend">Stipend</MenuItem>
                <MenuItem value="None">None</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="adult-trained-definition-label">
                Adult Trained Definition
              </InputLabel>
              <Select
                labelId="adult-trained-definition-label"
                value={formState.adultTrainedDefinition || ''}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    adultTrainedDefinition: e.target.value as
                      | 'The first day of program'
                      | '2-4 day provisional period'
                      | 'One week provisional period'
                      | 'Two week provisional period'
                      | 'Other'
                      | undefined,
                  });
                }}
                label="Adult Trained Definition"
              >
                <MenuItem value="The first day of program">
                  The first day of program
                </MenuItem>
                <MenuItem value="2-4 day provisional period">
                  2-4 day provisional period
                </MenuItem>
                <MenuItem value="One week provisional period">
                  One week provisional period
                </MenuItem>
                <MenuItem value="Two week provisional period">
                  Two week provisional period
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      )}

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Age"
          value={formState.traineesAge || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesAge: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Female"
          value={formState.traineesPercentFemale || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentFemale: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Male"
          value={formState.traineesPercentMale || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentMale: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Non-Binary"
          value={formState.traineesPercentNonBinary || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentNonBinary: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Transgender"
          value={formState.traineesPercentTransgender || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentTransgender: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent American Indian"
          value={formState.traineesPercentAmericanIndian || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentAmericanIndian: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Asian"
          value={formState.traineesPercentAsian || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentAsian: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Black"
          value={formState.traineesPercentBlack || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentBlack: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Latinx"
          value={formState.traineesPercentLatinx || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentLatinx: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Native Hawaiian"
          value={formState.traineesPercentNativeHawaiian || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentNativeHawaiian: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Multi-Racial"
          value={formState.traineesPercentMultiRacial || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentMultiRacial: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent White"
          value={formState.traineesPercentWhite || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentWhite: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Other Race"
          value={formState.traineesPercentOtherRace || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentOtherRace: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Trainees Percent Race Unknown"
          value={formState.traineesPercentRaceUnknown || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              traineesPercentRaceUnknown: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Returning Citizens"
          value={formState.barrierReturningCitizens || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierReturningCitizens: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Physical Disability"
          value={formState.barrierPhysicalDisability || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierPhysicalDisability: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Intellectual Disability"
          value={formState.barrierIntellectualDisability || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierIntellectualDisability: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Unhoused"
          value={formState.barrierUnhoused || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierUnhoused: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Mental Health"
          value={formState.barrierMentalHealth || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierMentalHealth: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier New Americans"
          value={formState.barrierNewAmericans || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierNewAmericans: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier In Recovery"
          value={formState.barrierInRecovery || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierInRecovery: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Barrier Veteran"
          value={formState.barrierVeteran || ''}
          onChange={(e) => {
            setFormState({
              ...formState,
              barrierVeteran: e.target.value
                ? parseInt(e.target.value, 10)
                : undefined,
            });
          }}
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wraparound Healthcare</InputLabel>
          <Select
            name="wrapAroundHealthcare"
            value={formState.wrapAroundHealthcare}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundHealthcare: e.target.value as
                  | 'Partner agency'
                  | 'In-house'
                  | 'Not provided',
              })
            }
          >
            <MenuItem value="Partner agency">Partner agency</MenuItem>
            <MenuItem value="In-house">In-house</MenuItem>
            <MenuItem value="Not provided">Not provided</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wraparound Childcare</InputLabel>
          <Select
            name="wrapAroundChildcare"
            value={formState.wrapAroundChildcare}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundChildcare: e.target.value as
                  | 'Partner agency'
                  | 'In-house'
                  | 'Not provided',
              })
            }
          >
            <MenuItem value="Partner agency">Partner agency</MenuItem>
            <MenuItem value="In-house">In-house</MenuItem>
            <MenuItem value="Not provided">Not provided</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Wraparound Transportation</InputLabel>
          <Select
            name="wrapAroundTransportation"
            value={formState.wrapAroundTransportation}
            onChange={(e) =>
              setFormState({
                ...formState,
                wrapAroundTransportation: e.target.value as
                  | 'Partner agency'
                  | 'In-house'
                  | 'Not provided',
              })
            }
          >
            <MenuItem value="Partner agency">Partner agency</MenuItem>
            <MenuItem value="In-house">In-house</MenuItem>
            <MenuItem value="Not provided">Not provided</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <TextField
          label="Other Wraparound Services"
          value={formState.otherWrapAroundServices}
          onChange={(e) =>
            setFormState({
              ...formState,
              otherWrapAroundServices: e.target.value,
            })
          }
          fullWidth
        />
      </Box>
      {/* Funding Fields */}
      <Box mb={2}>
        <TextField
          label="Public Funding"
          type="number"
          value={formState.fundingPublic}
          onChange={(e) =>
            setFormState({
              ...formState,
              fundingPublic: Number(e.target.value),
            })
          }
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Private Funding"
          type="number"
          value={formState.fundingPrivate}
          onChange={(e) =>
            setFormState({
              ...formState,
              fundingPrivate: Number(e.target.value),
            })
          }
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Social Enterprise Funding"
          type="number"
          value={formState.fundingSocialEnterprise}
          onChange={(e) =>
            setFormState({
              ...formState,
              fundingSocialEnterprise: Number(e.target.value),
            })
          }
          fullWidth
        />
      </Box>
      {/* SNAP E&T and WIOA */}
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>SNAP E&T</InputLabel>
          <Select
            name="snapET"
            value={formState.snapET}
            onChange={(e) =>
              setFormState({
                ...formState,
                snapET: e.target.value as 'Yes' | 'No But' | 'No And',
              })
            }
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No But">No But</MenuItem>
            <MenuItem value="No And">No And</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>WIOA</InputLabel>
          <Select
            name="wioa"
            value={formState.wioa}
            onChange={(e) =>
              setFormState({
                ...formState,
                wioa: e.target.value as 'Yes' | 'No But' | 'No And' | undefined,
              })
            }
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No But">No But</MenuItem>
            <MenuItem value="No And">No And</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Curriculum */}
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Curriculum</InputLabel>
          <Select
            name="curriculum"
            value={formState.curriculum}
            onChange={(e) =>
              setFormState({
                ...formState,
                curriculum: e.target.value as 'All' | 'Part' | undefined,
              })
            }
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Part">Part</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Internship/Externship */}
      <Box mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="internshipOrExternship"
              checked={formState.internshipOrExternship}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  internshipOrExternship: e.target.checked,
                })
              }
            />
          }
          label="Internship or Externship"
        />
      </Box>
      {formState.internshipOrExternship && (
        <div id="internshipOrExternship">
          <Box mb={2}>
            <TextField
              label="Internship Description"
              value={formState.internshipDescription}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  internshipDescription: e.target.value,
                })
              }
              fullWidth
              disabled={!formState.internshipOrExternship}
            />
          </Box>
        </div>
      )}
      {/* Other Fields */}
      <Box mb={2}>
        <TextField
          label="Minimum Wage 2023"
          type="number"
          value={formState.minimumWage2023}
          onChange={(e) =>
            setFormState({
              ...formState,
              minimumWage2023: Number(e.target.value),
            })
          }
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Job Type in Food Service</InputLabel>
          <Select
            name="jobTypeFoodService"
            value={formState.jobTypeFoodService}
            onChange={(e) =>
              setFormState({
                ...formState,
                jobTypeFoodService: e.target.value as
                  | '1-25%'
                  | '26-50%'
                  | '51-75%'
                  | '76-100%',
              })
            }
          >
            <MenuItem value="1-25%">1-25%</MenuItem>
            <MenuItem value="26-50%">26-50%</MenuItem>
            <MenuItem value="51-75%">51-75%</MenuItem>
            <MenuItem value="76-100%">76-100%</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <TextField
          label="Alumni Hired By Organization"
          type="number"
          value={formState.alumniHiredByOrg}
          onChange={(e) =>
            setFormState({
              ...formState,
              alumniHiredByOrg: Number(e.target.value),
            })
          }
          fullWidth
        />
      </Box>
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(formState)}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}
