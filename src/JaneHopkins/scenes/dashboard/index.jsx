import { useState } from "react";
import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import AppointmentGrid from "../../components/AppointmentGrid";
import { Link } from "react-router-dom";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

//import StatBox from "../../components/StatBox";

const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');
  const todayStartOfTheDay = today.startOf('day');

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: colors.greenAccent[600],
    '&:hover': {
      backgroundColor: colors.greenAccent[500],
    },
  }));

  return (
    <Box m="20px">

        <Box display = "flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
      
        
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          justifyContent="center"
          mt="50px"
        >
      
          {/*Row 1 */}

          <Box 
            gridColumn="span 4" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center"
            justifyContent="center"
          >
             <VaccinesIcon sx={{display: "flex", fontSize: 70, color: colors.greenAccent[500]}}/>
             <Link
  
                display="flex"
                component="button"
                variant="body2"
                color={colors.greenAccent[500]}
                style={{ textDecoration: "none"}}
                to=""

            >
              <Typography variant="h6" fontWeight="500" color={colors.greenAccent[500]}>
                Track Dosage
              </Typography>
            </Link>
          </Box>

          <Box 
            gridColumn="span 4" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center"
            justifyContent="center"
          >
            <PeopleOutlinedIcon sx={{display: "flex", fontSize: 70, color: colors.greenAccent[500]}}/>
            <Link
  
                display="flex"
                component="button"
                variant="body2"
                color={colors.greenAccent[500]}
                style={{ textDecoration: "none"}}
                to="/patient"

            >
              <Typography variant="h6" fontWeight="500" color={colors.greenAccent[500]}>
                View Patients
              </Typography>
            </Link>
          
          </Box>

          <Box 
            gridColumn="span 4" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center"
            justifyContent="center"
          >
            <PersonAddIcon sx={{display: "flex", fontSize: 60, color: colors.greenAccent[500]}}/>
            <Link
  
                display="flex"
                component="button"
                variant="body2"
                color={colors.greenAccent[500]}
                style={{ textDecoration: "none"}}
                to="/addpatient"

            >
              <Typography variant="h6" fontWeight="500" color={colors.greenAccent[500]}>
                Add New Patient
              </Typography>
            </Link>
          </Box>

            {/*Row 2 */}

          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            display="flex"
            
          >
            <AppointmentGrid/>
            
          </Box>

          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent=""
            alignItems=""
            >
            
            <Box sx={{ml: "40px"}}>

            <Typography ml="100px" mt= "10px" mb="30px" variant="h6" fontWeight="700" color={colors.greenAccent[500]}>
              Schedule Appointment
            </Typography>

            <TextField 
              id="outlined-basic" 
              label="Name" 
              variant="outlined" 
            />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    'Date',
                    'Time',
                  
                  ]}
                >
                  <DemoItem label="Date">
                    <DatePicker
                      defaultValue={today}
                      views={['year', 'month', 'day']}
                    />
                  </DemoItem>
                  <DemoItem label="Time">
                    <TimePicker defaultValue={todayStartOfTheDay} />
                  </DemoItem>
                
                </DemoContainer>
              </LocalizationProvider>

              <Box sx={{display: "flex", alignContent: "center"}} mt="20px" ml="130px">
              
                <ColorButton variant="contained" size='large'>Add Appointment</ColorButton>
           
              </Box>

            </Box>

          </Box>

        </Box>
        
    </Box>
  )
}

export default Dashboard;