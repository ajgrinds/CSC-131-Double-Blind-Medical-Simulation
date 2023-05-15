import React from 'react'
import { useState, useEffect } from 'react';
import useBavaria from '../../../vendiaHooks/useBavaria';
import {Box, Typography, useTheme, Grid, CircularProgress} from "@mui/material";
import TextField from '@mui/material/TextField';


const PatientDetails = ({id}) => {

    const [patient, setPatient] = useState(null);
    const { entities } = useBavaria();
    const [isLoading, setIsLoading] = useState(false);
    

    console.log(id);
    useEffect(() => {
        async function fetchPatient() {
          
          try{
    
              const response = await entities.patient.get(id);
              console.log(response);
              setPatient(response);
              setIsLoading(true);

              
              //console.log(newAllergies);
          }
          catch(error){
              console.log(error);
          }
          finally{
              setIsLoading(false);
          }
        }
        fetchPatient();
        setIsLoading(false);
      
      }, [entities.patient, id]);


  return (
    <Box>
        {patient ? (
            <Box m="20px">
                <Box justifyContent="center" alignItems="center">
                    <Typography variant='h4'> Patient Details </Typography>
                </Box>
                
                <Grid
                    mt="20px"
                    container
                    rowSpacing={2}
                    columnSpacing={{xs: 1, sm: 2, md: 3, lg: 4}}
                    justifyContent="center"
                >

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField
                            id="outlined-read-only-input"
                            label="Name"
                            color='secondary'
                            defaultValue="null"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        /> 

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField
                            id="outlined-read-only-input"
                            label="DOB"
                            color='secondary'
                            defaultValue={patient.dob}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                            /> 

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField
                            id="outlined-read-only-input"
                            label="Insurance Number"
                            color='secondary'
                            defaultValue="null"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                            /> 
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField
                            id="outlined-read-only-input"
                            label="Height"
                            color='secondary'
                            defaultValue={patient.height}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                            /> 
                     </Grid>

                     <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField
                            id="outlined-read-only-input"
                            label="Weight"
                            color="secondary"
                            defaultValue={patient.weight}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                            />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField
                            id="outlined-read-only-input"
                            label="Blood Pressure"
                            color='secondary'
                            defaultValue={patient.bloodPressure}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                            /> 

                    </Grid>
                    <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-read-only-input"
                  label="Blood Type"
                  color='secondary'
                  defaultValue={patient.bloodType}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-read-only-input"
                  label="Temperature"
                  color='secondary'
                  defaultValue={patient.temperature}
                  InputProps={{
                    readOnly: true,
                }}
                  
                  variant="filled"
                
                />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-read-only-input"
                  label="Oxygen Saturation"
                  color='secondary'
                  defaultValue={patient.oxygenSaturation}
                  InputProps={{
                    readOnly: true,
                }}
                  variant="filled"
                />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-read-only-input"
                  label="UUID"
                  color='secondary'
                  defaultValue={patient.uuid}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-read-only-input"
                  label="Address"
                  color='secondary'
                  defaultValue="null"
                  InputProps={{
                    readOnly: true,
                }}
                  variant="filled"
                />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-read-only-input"
                  label="Family History"
                  color='secondary'
                  defaultValue={patient.familyHistory}
                  InputProps={{
                    readOnly: true,
                }}
                  variant="filled"
                />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-read-only-input"
                  label="Allergies"
                  color='secondary'
                  defaultValue={patient.allergies && patient.allergies.map(allergy => JSON.stringify(allergy)).join(', ')}
                  InputProps={{
                    readOnly: true,
                }}
                  variant="filled"
                />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-read-only-input"
                  label="Current Medication"
                  color='secondary'
                  defaultValue={patient.currentMedications && patient.currentMedications.map(meds => JSON.stringify(meds)).join(', ')}
                  InputProps={{
                    readOnly: true,
                }}
                  variant="filled"
                />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-read-only-input"
                  label="ICD Health Code"
                  color='secondary'
                  defaultValue={patient.icdHealthCodes && patient.icdHealthCodes.map(codes => JSON.stringify(codes)).join(', ')}
                  InputProps={{
                    readOnly: true,
                }}
                  variant="filled"
                />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="filled-number"
                  label="Doctor Visits"
                  type="number"
                  color='secondary'
                  defaultValue={patient.visits.length}
                  InputProps={{
                    readOnly: true,
                }}
                  variant="filled"
                />
            </Grid>
            
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >

              <TextField
                  id="outlined-read-only-input"
                  label="Currently Insured"
                  color='secondary'
                  
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={patient.currentlyInsured}
                  variant="filled"
                />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-read-only-input"
                  label="Currently Employed"
                  color='secondary'
                 
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={patient.currentlyEmployed}
                  variant="filled"
                />
            </Grid>


                </Grid>
            </Box>
        ) : (

            <Box>
                <Typography>Loading...</Typography>
            </Box>

        )}

        



    </Box>
  )
}

export default PatientDetails;