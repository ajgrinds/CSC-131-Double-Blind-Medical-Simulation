import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useJaneHopkins from '../../../vendiaHooks/useJaneHopkins';
import CircularProgress from '@mui/material/CircularProgress';
import {Box, Typography, useTheme, Grid, useMediaQuery} from "@mui/material";
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
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));

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
        console.log(event.target.value);
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
        console.log(event.target.value);
        setAddress(event.target.value); 
    }
    const handleAddCurrentlyEmployed = (event) => {
        setCurrentlyEmployed(event.target.value); 
    }
    const handleAddCurrentlyInsured = (event) => {
        setCurrentlyInsured(event.target.value); 
    }
    const handleFamilyHistory = (event) => {
      setFamilyHistory(event.target.value);
    }

    
    const handleAllergiesChange = (event) => {
      const input = event.target.value;
      const allergiesArray = input.split(",").map((allergy) => allergy.trim());

      console.log("allergies array:", allergiesArray);
      setAllergies(allergiesArray);
    };

    const handleIcdHealthCodeChange = (event) => {
      const input = event.target.value;
      const icdHealthCodeArray = input.split(",").map((icd) => icd.trim());

      console.log("icd health code array:", icdHealthCodeArray);
      setIcdHealthCodes(icdHealthCodeArray);
    };

    const handleCurrentMedicationChange = (event) => {
      const input = event.target.value;
      const medsArray = input.split(",").map((currMeds) => currMeds.trim());

      setCurrentMedication(medsArray);
    };
    

    
    const [isLoading, setIsLoading] = useState(false);
    const handleAddPatient = async () => {
      setIsLoading(true);
      const allergiesArray = allergies.map((allergy) => ({ allergy: allergy }));
      const icdHealthCodeArray = icdHealthCodes.map((icd) => ({ code: icd }));
      const medsArray = currentMedication.map((meds) => ({ medication: meds }));

      const response = await entities.patient.add({
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
        allergies: allergiesArray,
        uuid: uuid, 
        address: address, 
        familyHistory: familyHistory, 
        icdHealthCodes: icdHealthCodeArray, 
        currentMedications: medsArray,
        currentlyEmployed: currentlyEmployed, 
        currentlyInsured: currentlyInsured,
       
      },
      {
        aclInput:{
          acl:[
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "dob"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "weight"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "height"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "weight"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "bloodPressure"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "bloodType"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "temperature"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "oxygenSaturation"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "uuid"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "currentMedications"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "familyHistory"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "allergies"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "currentlyEmployed"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "currentlyInsured"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "icdHealthCodes"
            },
            {
              principal: {
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "visits"
            },
          ]
        }
      }
      
    );
    
      console.log(response);
    
      // Wait for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
    
      setIsLoading(false);
      // Move to the link
      window.location.href = "/JaneHopkins/patient";
    }
    

    return (

      <Box m="20px">
        <Box 
          display={smScreen ? "flex" : "block"}
          flexDirection={smScreen ? "row" : "column"}
          justifyContent={smScreen ? "space-between" : "start"}
          alignItems={smScreen ? "center" : "start"}
          m="10px 0"
        >
            <Header title="Patient Details" subtitle="Add Patient"/>
        </Box>

        <Box
            width="100%"
            display="flex"
            justifyContent="space-around"  // Updated property
            alignItems="center"
          >
            <Link to="/JaneHopkins/patient" style={{textDecoration: "none"}}>
              <ColorButton variant="contained" size="large">View All Patients</ColorButton>
            </Link>

            
            <ColorButton variant="contained" size="large" onClick={handleAddPatient}>Add Patient</ColorButton> 
           
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
                defaultValue=""
                onChange={handleAddName}
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
                label="Picture link"
                color='secondary'
                defaultValue=""
                onChange={handleAddPatientPicture}
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
                defaultValue=""
                onChange={handleAddDob}
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
                defaultValue=""
                onChange={handleInsuranceNumber}
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
                defaultValue=""
                onChange={handleAddHeight}
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
                color='secondary'
                defaultValue=""
                onChange={handleAddWeight}
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
                defaultValue=""
                onChange={handleAddBloodPressure}
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
                defaultValue=""
                onChange={handleAddBloodType}
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
                defaultValue=""
                onChange={handleAddTemperature}
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
                defaultValue=""
                onChange={handleAddOxygenSaturation}
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
                defaultValue=""
                onChange={handleAddUuid}
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
                defaultValue=""
                onChange={handleAddAddress}
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
                defaultValue=""
                onChange={handleFamilyHistory}
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
                defaultValue=""
                variant="filled"
                onChange={handleAllergiesChange}
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
                label="Current Medications"
                color='secondary'
                defaultValue=""
                variant="filled"
                onChange={handleCurrentMedicationChange}
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
                defaultValue=""
                onChange={handleIcdHealthCodeChange}
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
                defaultValue=""
                onChange={handleAddCurrentlyEmployed}
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
                defaultValue=""
                onChange={handleAddCurrentlyInsured}
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
          </Grid>
      </Box>

       
      
    );
  }
  

export default AddPatient