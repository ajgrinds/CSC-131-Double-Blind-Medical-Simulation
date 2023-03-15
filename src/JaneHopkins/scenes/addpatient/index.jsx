import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useJaneHopkins from '../../../vendiaHooks/useJaneHopkins';
import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from '../../theme';
import Header from '../../components/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


function AddPatient() {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { entities } = useJaneHopkins();
    const [patient, setPatient] = useState(null);

    //patient entities
    const [name, setName] = useState("");
    const [dob, setDob] = useState(""); 
    const [patientPicture, setPatientPicture] = useState("");
    const [insuranceNumber, setInsuranceNumber] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bloodType, setBloodType] = useState(""); 
    const [bloodPressure, setBloodPressure] = useState(""); 
    const [temperature, setTemperature] = useState(""); 
    const [oxygenSaturation, setOxygenSaturation] = useState(""); 
    const [uuid, setUuid] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [currentMedication, setCurrentMedication] = useState([]); 
    const [familyHistory, setFamilyHistory] = useState(""); 
    const [currentlyEmployed, setCurrentlyEmployed] = useState(""); 
    const [currentlyInsured, setCurrentlyInsured] = useState(""); 
    const [icdHealthCodes, setIcdHealthCodes] = useState([]); 
    const [allergies, setAllergies] = useState([]); 
    const [visits, setVisits] = useState([]);

    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: colors.greenAccent[600],
      '&:hover': {
        backgroundColor: colors.greenAccent[500],
      },
    }));

    const handleAddName = (event) => {
        setName(event.target.value); 
    }
    const handleAddDob = (event) => {
        setDob(event.target.value); 
    }
    const handleAddPatientPicture = (event) =>{
        setPatientPicture(event.target.value);
    }
    const handleInsuranceNumber = (event) => {
        setInsuranceNumber(event.target.value); 
    }
    const handleAddHeight = (event) => {
        setHeight(event.target.value); 
    }
    const handleAddWeight = (event) => {
        setWeight(event.target.value); 
    }
    const handleAddBloodType = (event) => {
        setBloodType(event.target.value); 
    }
    const handleAddBloodPressure = (event) => {
        setBloodPressure(event.target.value); 
    }
    const handleAddTemperature = (event) => {
        setTemperature(event.target.value); 
    }
    const handleAddOxygenSaturation = (event) => {
        setOxygenSaturation(event.target.value); 
    }
    const handleAddUuid = (event) => {
        setUuid(event.target.value); 
    }
    const handleAddAddress = (event) => {
        setAddress(event.target.value); 
    }
    const handleAddCurrentlyEmployed = (event) => {
        setCurrentlyEmployed(event.target.value); 
    }
    const handleAddCurrentlyInsured = (event) => {
        setCurrentlyInsured(event.target.value); 
    }


    const handleAddPatient = () => {
        const response = entities.patient.add({

            name: name,
            dob: dob, 
            patientPicture: patientPicture,
            insuranceNumber: insuranceNumber, 
            height: height, 
            weight: weight,
            bloodType: bloodType, 
            bloodPressure: bloodPressure,
            temperature: temperature, 
            oxygenSaturation: oxygenSaturation,
            uuid: uuid, 
            address: address, 
            currentlyEmployed: currentlyEmployed, 
            currentlyInsured: currentlyInsured, 

           
           
        })
        console.log(response); 
    }

  
    return (
  
      <Box m="20px">
        <Box display = "flex" justifyContent="space-between" alignItems="center">
          <Header title="PATIENT DETAILS" subtitle="Add Patient" />
        </Box>

        <Box ml="225px" mr="200px">

          <Box>
            <Box mb="50px" sx={{display: "flex", justifyContent: "space-between"}}>

              <Link to="/patient" style={{ textDecoration: "none"}}>
                  <ColorButton variant="contained" size='large' sx={{marginLeft:"5px"}}>View All Patients</ColorButton>
              </Link>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}></Box>
            
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
                defaultValue=""
                onChange={handleAddName}
                variant="filled"
              /> 
                <TextField
                id="outlined-read-only-input"
                label="DOB"
                color='secondary'
                defaultValue=""
                onChange={handleAddDob}
                variant="filled"
              />  
                <TextField
                id="outlined-read-only-input"
                label="Patient Picture"
                color='secondary'
                defaultValue=""
                onChange={handleAddPatientPicture}
                variant="filled"
              /> 
              <TextField
                id="outlined-read-only-input"
                label="Insurance Number"
                color='secondary'
                defaultValue=""
                onChange={handleInsuranceNumber}
                variant="filled"
              /> 
              <TextField
                id="outlined-read-only-input"
                label="Height"
                color='secondary'
                defaultValue=""
                onChange={handleAddHeight}
                variant="filled"
              /> 
              <TextField
                id="outlined-read-only-input"
                label="Weight"
                color='secondary'
                defaultValue=""
                onChange={handleAddWeight}
                variant="filled"
              />
              <TextField
                id="outlined-read-only-input"
                label="Blood Pressure"
                color='secondary'
                defaultValue=""
                onChange={handleAddBloodPressure}
                variant="filled"
              /> 
              <TextField
                id="outlined-read-only-input"
                label="Blood Type"
                color='secondary'
                defaultValue=""
                onChange={handleAddBloodType}
                variant="filled"
              />
              <TextField
                id="outlined-read-only-input"
                label="Temperature"
                color='secondary'
                defaultValue=""
                onChange={handleAddTemperature}
                variant="filled"
              />
              <TextField
                id="outlined-read-only-input"
                label="Oxygen Saturation"
                color='secondary'
                defaultValue=""
                onChange={handleAddOxygenSaturation}
                variant="filled"
              />
              <TextField
                id="outlined-read-only-input"
                label="UUID"
                color='secondary'
                defaultValue=""
                onChange={handleAddUuid}
                variant="filled"
              />
              <TextField
                id="outlined-read-only-input"
                label="Address"
                color='secondary'
                defaultValue=""
                onChange={handleAddAddress}
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
                id="outlined-read-only-input"
                label="Currently Employed"
                color='secondary'
                defaultValue=""
                onChange={handleAddCurrentlyEmployed}
                variant="filled"
              />
                <TextField
                id="outlined-read-only-input"
                label="Currently Insured"
                color='secondary'
                defaultValue=""
                onChange={handleAddCurrentlyInsured}
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
                

            </Box>
          
            <Box textAlign="center" mt='50px'> 
              <ColorButton size='large' variant="contained" onClick={handleAddPatient}>Save Patient Info</ColorButton>
            </Box>

          </Box>
        </Box>  
       

      </Box>

       
      
    );
  }
  

export default AddPatient