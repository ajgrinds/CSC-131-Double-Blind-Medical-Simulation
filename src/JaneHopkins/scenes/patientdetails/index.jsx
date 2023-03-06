import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useJaneHopkins from '../../../vendiaHooks/useJaneHopkins';
import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from '../../theme';
import Header from '../../components/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import avatar from "../../pictures/squiliem.jpeg"

function PatientDetails() {
  // theme settings
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // pulling patient info 
  const { id } = useParams();
  const { entities } = useJaneHopkins();
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // updating new patient info
  const [newWeight, setNewWeight] = useState(null);
  const [newInsuranceNumber, setNewInsuranceNumber] = useState(null);
  const [newBloodPressure, setNewBloodPressure] = useState(null);
  const [newTemperature, setNewTemperature] = useState(null);
  const [newOxygenSaturation, setNewOxygenSaturation] = useState(null);
  const [newAddress, setNewAddress] = useState(null);
  //const [newAllergies, setNewAllergies] = useState([]);
 // const [newMedication, setNewMedication] = useState([]);
  //const [newIcdHealthCode, setNewIcdHealthCode] = useState([]);
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

          
          setNewWeight(response.weight);
          setNewInsuranceNumber(response.insuranceNumber);
          setNewBloodPressure(response.bloodPressure);
          setNewTemperature(response.bloodPressure);
          setNewOxygenSaturation(response.oxygenSaturation);
          setNewAddress(response.address);
          setNewCurrentlyInsured(response.insuranceNumber === "" ? "No" : "Yes");
          setNewCurrentlyEmployed(response.currentlyEmployed);
          

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
  /*
  const handleAllergyChange = (event) => {
    setNewAllergies(event.target.value);
  }
  const handleMedicationChange = (event) => {
    setNewMedication(event.target.value);
  }
  
  const handleNewICDHealthCodeChange = (event) => {
    setNewIcdHealthCode(event.target.value);
  }
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

          <Box mt='5px'> 
            <Link to="/patient" style={{ textDecoration: "none"}}>
              <ColorButton size='large' variant="contained"> Back </ColorButton>
            </Link>
            
          </Box>
        
          <Box sx={{display: 'flex', justifyContent: 'center' }} mb='20px'>

            <img
              alt="profile-user"
              width="100px"
              height="100px"
              src={avatar}
              style={{cursor: "pointer", borderRadius: "50%"}}                                 
            />
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}></Box>
            <div>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                 <TextField
                  id="outlined-read-only-input"
                  label="Insurance Number"
                  color='secondary'
                  defaultValue={patient.insuranceNumber}
                  onChange={handleInsuranceChange}
                  variant="filled"
                /> 
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

                <TextField
                  id="outlined-read-only-input"
                  label="Weight"
                  color="secondary"
                  defaultValue={patient.weight}
                  onChange={handleWeightChange}
                  variant="filled"
                />

                <TextField
                  id="outlined-read-only-input"
                  label="Blood Pressure"
                  color='secondary'
                  defaultValue={patient.bloodPressure}
                  onChange={handleBloodPressureChange}
                  variant="filled"
                /> 
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

                <TextField
                  id="outlined-read-only-input"
                  label="Temperature"
                  color='secondary'
                  defaultValue={patient.temperature}
                  onChange={handleTemperatureChange}
                  variant="filled"
                 
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Oxygen Saturation"
                  color='secondary'
                  defaultValue={patient.oxygenSaturation}
                  onChange={handleOxygenSaturationChange}
                  variant="filled"
                />
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
                <TextField
                  id="outlined-read-only-input"
                  label="Address"
                  color='secondary'
                  defaultValue={patient.address}
                  onChange={handleAddressChange}
                  variant="filled"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Allergies"
                  color='secondary'
                  defaultValue=""
                  variant="filled"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Current Medication"
                  color='secondary'
                  defaultValue=""
                  variant="filled"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="ICD Health Code"
                  color='secondary'
                  defaultValue=""
                  variant="filled"
                />
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
                
        </Box>
          </div>
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
