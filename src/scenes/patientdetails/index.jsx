import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useJaneHopkins from '../../vendiaHooks/useJaneHopkins';
import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import Header from '../../components/Header';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import avatar from '../../components/squiliem.jpeg';




function PatientDetails() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const { entities } = useJaneHopkins();
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [employed, setEmployed] = React.useState('');
  const [insured, setInsured] = React.useState('');
  const handleChange = (event) => {setEmployed(event.target.value);};
  const handle_Change = (event) => {setInsured(event.target.value);};

  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: colors.greenAccent[600],
    '&:hover': {
      backgroundColor: colors.greenAccent[500],
    },
  }));

  console.log(id);

  useEffect(() => {
    async function fetchPatient() {
      
      try{
        const response = await entities.patient.get(id);
        console.log(response);
        setPatient(response);
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
                  variant="filled"
                /> 
                <TextField
                  id="outlined-read-only-input"
                  label="Height"
                  color='secondary'
                  defaultValue={patient.height}
                  variant="filled"
                /> 
                <TextField
                  id="outlined-read-only-input"
                  label="Weight"
                  color='secondary'
                  defaultValue={patient.weight}
                  variant="filled"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Blood Pressure"
                  color='secondary'
                  defaultValue={patient.bloodPressure}
                  variant="filled"
                /> 
                <TextField
                  id="outlined-read-only-input"
                  label="Blood Type"
                  color='secondary'
                  defaultValue={patient.bloodType}
                  variant="filled"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Temperature"
                  color='secondary'
                  defaultValue={patient.temperature}
                  variant="filled"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Oxygen Saturation"
                  color='secondary'
                  defaultValue={patient.oxygenSaturation}
                  variant="filled"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="UUID"
                  color='secondary'
                  defaultValue={patient.uuid}
                  variant="filled"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Address"
                  color='secondary'
                  defaultValue={patient.address}
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

                <FormControl sx={{minWidth: 200, ml:'8px', mr:'8px', mt:'5px' }} >
                
                  <InputLabel id="demo-simple-select-label" >Insured</InputLabel>
                    <Select
                      color='secondary'
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={insured}
                      label="insured"
                      onChange={handle_Change}
                      variant="filled"
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{minWidth: 200, ml:'8px', mt:'5px' }} >
                
                  <InputLabel id="demo-simple-select-label" >Currently Employed</InputLabel>
                    <Select
                      color='secondary'
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={employed}
                      label="employed"
                      onChange={handleChange}
                      variant="filled"
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
        </Box>
          </div>
        <Box textAlign="center" mt='50px'> 
          <ColorButton size='large' variant="contained">Update Infomation</ColorButton>
        </Box>
  </Box>
  
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}



export default PatientDetails;
