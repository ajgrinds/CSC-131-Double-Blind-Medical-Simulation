import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useJaneHopkins from '../../../vendiaHooks/useJaneHopkins';
import {Box, Typography, useTheme, Grid} from "@mui/material";
import { tokens } from '../../theme';
import Header from '../../components/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import avatar from "../../pictures/squiliem.jpeg"

function PatientDetails() {

  // theme settings
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // pulling patient info 
  const { id } = useParams();
  const { entities } = useJaneHopkins();
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(id);

  //const navigate = useNavigate();
  const handleDelete = async (id) => {
    
    console.log("ID from parameter:", id);
    try {
      const resp = entities.patient.remove(id);
      
      console.log(resp);
      if (resp.ok) {
        console.log(`Patient ${id} deleted successfully`);
        
        //navigate('JaneHopkins/patient/');
      } else {
        console.log(`Unable to delete patient ${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  
  const DeleteButton = ({ id }) => {

    console.log("ID from URL:", id);
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDeleteClick = () => {
      handleDelete(id);
      setOpen(false);
    };
  
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ColorButton size='large' onClick={handleClickOpen}>Delete Patient</ColorButton>
        </div>
       
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this patient?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <ColorButton onClick={handleDeleteClick} to={'/patient'}>Delete</ColorButton>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  
  

  // updating new patient info
  const [newWeight, setNewWeight] = useState(null);
  const [newInsuranceNumber, setNewInsuranceNumber] = useState(null);
  const [newBloodPressure, setNewBloodPressure] = useState(null);
  const [newTemperature, setNewTemperature] = useState(null);
  const [newOxygenSaturation, setNewOxygenSaturation] = useState(null);
  const [newAddress, setNewAddress] = useState(null);
  const [newAllergies, setNewAllergies] = useState([]);
  const [newCurrentMedication, setNewCurrentMedication] = useState([]);
  const [newIcdHealthCode, setNewIcdHealthCode] = useState([]);
  const [newFamilyHistory, setNewFamilyHistory] = useState("");
  //const [newDoctorVisits, setNewDoctorVisits] = useState([]);
  const [newCurrentlyInsured, setNewCurrentlyInsured] = useState("");
  const [newCurrentlyEmployed, setNewCurrentlyEmployed] = useState("");

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: colors.greenAccent[600],
    '&:hover': {
      backgroundColor: colors.greenAccent[500],
    },
  }));
  
  useEffect(() => {
    async function fetchPatient() {
      
      try{

          const response = await entities.patient.get(id);
          console.log(response);
          
          setPatient(response);
          
          // set the values of each entitie to the current value of the patients
          setNewWeight(response.weight);
          setNewInsuranceNumber(response.insuranceNumber);
          setNewBloodPressure(response.bloodPressure);
          setNewTemperature(response.temperature);
          setNewOxygenSaturation(response.oxygenSaturation);
          setNewAddress(response.address);
          setNewCurrentlyInsured(response.insuranceNumber === "" ? "No" : "Yes");
          setNewCurrentlyEmployed(response.currentlyEmployed);
          setNewAllergies(response.allergies);
          setNewCurrentMedication(response.currentMedications);
          setNewIcdHealthCode(response.icdHealthCodes);
          setNewFamilyHistory(response.familyHistory);
          
      }
      catch(error){
          console.log(error);
      }
      finally{
          setIsLoading(false);
      }
    }
    fetchPatient();
  
  }, [entities.patient, id]);

  // Functions for the onChange in each Item component for each potential change in entities
  const handleWeightChange = (event) => {
    setNewWeight(event.target.value);
  }

  const handleInsuranceChange = (event) => {
    setNewInsuranceNumber(event.target.value);
  }

  const handleBloodPressureChange = (event) => {
    setNewBloodPressure(event.target.value);
  }

  const handleTemperatureChange = (event) => {
    setNewTemperature(event.target.value);
  }

  const handleOxygenSaturationChange = (event) => {
    setNewOxygenSaturation(event.target.value);
  }

  const handleAddressChange = (event) => {
    setNewAddress(event.target.value);
  }

  
  const handleAllergyChange = (event) => {
    setNewAllergies([...newAllergies, event.target.value])
    
  }
  
  const handleMedicationChange = (event) => {
    setNewCurrentMedication([...newCurrentMedication, event.target.value])
  }
  
  const handleICDHealthCodeChange = (event) => {
    setNewIcdHealthCode([...newIcdHealthCode, event.target.value]);
  }

  const handleFamilyHistoryChange = (event) => {
    setNewFamilyHistory([event.target.value]);
  }
  /*
 
  const handleDoctorVisitsChange = (event) => {
    setNewDoctorVisits(event.target.value);
  }
  */
  const handleCurrentlyInsuredChange = (event) => {
    setNewCurrentlyInsured(event.target.value);
  }

  const handleCurrentlyEmployedChange = (event) => {
    setNewCurrentlyEmployed(event.target.value);
  }

  // this function will update the patients information that is linked the the update button
  const handleUpdate = async () => {
    
    const response = await entities.patient.update({

        _id: id,
        weight: newWeight,
        insuranceNumber: newInsuranceNumber,
        bloodPressure: newBloodPressure,
        temperature: newTemperature,
        oxygenSaturation: newOxygenSaturation,
        address: newAddress,
        currentlyInsured: newCurrentlyInsured,
        currentlyEmployed: newCurrentlyEmployed,
        currentMedication: newCurrentMedication,
        allergies: newAllergies,
        icdHealthCodes: newIcdHealthCode, 
        familyHistory: newFamilyHistory, 
        

    })
    console.log(response);

  }
 
  return (

    <div>
      {patient ? (

        <Box m="20px">
          <Box display = "flex" justifyContent="space-between" alignItems="center">
            <Header title="PATIENT DETAILS" subtitle="Edit/Update Information" />
          </Box>

          <Box 
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          > 
            <Link to="/JaneHopkins/patient" style={{ textDecoration: "none"}}>
              <ColorButton size='large' variant="contained"> Back </ColorButton>
            </Link>

            <DeleteButton id={patient?._id} onDelete={handleDelete} />
            
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
              sm={12}
              md={12}
              lg={12}
              xl={12}
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
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={patient.patientPicture}
                style={{cursor: "pointer", borderRadius: "50%"}}                                 
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
                  label="Name"
                  color='secondary'
                  defaultValue={patient.name}
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
                  defaultValue={patient.insuranceNumber}
                  onChange={handleInsuranceChange}
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
                  onChange={handleWeightChange}
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
                  onChange={handleBloodPressureChange}
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
                  onChange={handleTemperatureChange}
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
                  onChange={handleOxygenSaturationChange}
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
                  defaultValue={patient.address}
                  onChange={handleAddressChange}
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
                  onChange={handleFamilyHistoryChange}
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
                  onChange={handleAllergyChange}
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
                  onChange={handleMedicationChange}
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
                  onChange={handleICDHealthCodeChange}
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
                  defaultValue=""
                  InputLabelProps={{
                    shrink: true,
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
                  onChange={handleCurrentlyInsuredChange}
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
                  onChange={handleCurrentlyEmployedChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={patient.currentlyEmployed}
                  variant="filled"
                />
            </Grid>
            
            

              


          </Grid>
          

          <Box ml="225px" mr="200px">


            <Box mr="100px" sx={{display: 'flex', justifyContent: 'center' }} mb='20px'>

            </Box>

            
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
               
              </Box>
          </Box>
          
        <Box textAlign="center" mt='50px'> 
          <ColorButton size='large' variant="contained" onClick={handleUpdate}>Update Infomation</ColorButton>
        </Box>

  </Box>
  
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}



export default PatientDetails;
