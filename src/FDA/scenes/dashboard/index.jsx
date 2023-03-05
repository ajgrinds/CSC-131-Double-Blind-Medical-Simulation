import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FlagIcon from '@mui/icons-material/Flag';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//import StatBox from "../../components/StatBox";

const FDADashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


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
        >
          {/*Row 1 */}

          <Box 
            gridColumn="span 4" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center"
            justifyContent="center"
            borderRadius={5}
          >
            <MedicalServicesIcon sx={{color: colors.blueAccent[500]}}/>
            <Typography variant='h5' p={1}>
              Drugs
            </Typography>
        
          </Box>

          <Box 
            gridColumn="span 4" 
            backgroundColor={colors.primary[400]} 
            display="flex"  
            alignItems="center"
            justifyContent="center" 
            borderRadius={5}
          >
            <PeopleOutlinedIcon sx={{color: colors.blueAccent[500]}}/>
            <Typography variant='h5' p={1}>
               Patients
            </Typography>
          
          </Box>

          <Box 
            gridColumn="span 4" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center"
            justifyContent="center"
            borderRadius={5}
          >
            <FlagIcon sx={{color: colors.blueAccent[500]}}/>
            <Typography variant='h5' p={1}>
              Progress
            </Typography>

          </Box>

            {/*Row 2 */}

         <Box
            gridColumn="span 6"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            
          >
            
            <Typography variant="h4" fontWeight="500" color={colors.blueAccent[500]}>
              Assign Drugs
            </Typography>

            {/*<Button variant="contained" size="large">
              Assign
            </Button> */}

          
          </Box>  

          <Box
            gridColumn="span 6"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography variant="h4" fontWeight="500" color={colors.blueAccent[500]}>
              Send Results
            </Typography> 


            {/* SEND RESULT BUTTON
            <Button variant="contained" size="large">
              Send Result
            </Button> */}
            
          </Box>
          
          

        </Box> 
        
    </Box>
  )
}

export default FDADashboard;
