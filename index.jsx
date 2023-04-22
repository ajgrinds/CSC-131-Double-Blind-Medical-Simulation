import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FlagIcon from '@mui/icons-material/Flag';
import * as React from 'react';
import Button from '@mui/material/Button';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { NoBackpackSharp, SaveSharp } from "@mui/icons-material";
import Assign from '../../scenes/AssignDrugs/Assign.js';
import Send from '../../scenes/SendResult/Send.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

//import StatBox from "../../components/StatBox";

  const FDADashboard = () => {

  const [buttonAssign, setButtonAssign] = useState(false);
  const [buttonSend, setButtonSend] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px"> 

        <Box display = "flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
        
        <Box
          display="gtid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          justifyContent="space-between"
        >
          {/*Row 1 */}

            <Box
              gridColumn="span 10"
              gridRow="span 1"
              backgroundColor={colors.primary[0]}
              display="flex"
              justifyContent="space-evenly"
              alignItems="flex-start"
              flexDirection="row"
              borderRadius={5}
              paddingBottom={5}
            >
              {/*<AssignmentOutlinedIcon sx={{color: colors.blueAccent[500]}}/>*/}

          <Button component={Link} to="/FDA/patient" style= {{width:"450px", height:"250px"}} variant="contained"  sx={{borderRadius: 15, backgroundColor: colors.dashboardColor[100], color: "white", mt: 0}}>
            <SupervisorAccountIcon sx={{color: colors.blueAccent[0]}} style={{width:"80px", height:"120px"}}/>
            <Typography variant='h4' p={1}>
               Patients 
            </Typography>
          </Button>  

          <Button component={Link} to="/FDA/Studies" style= {{width:"450px", height:"250px"}} variant="contained"  sx={{borderRadius: 15, backgroundColor: colors.dashboardColor[100], color: "white", mt: 0}}>
          <MailOutlineOutlinedIcon sx={{color: colors.blueAccent[0]}} style={{width:"45px", height:"80px"}}/>
            <Typography variant='h4' p={1}>
            STUDIES
            </Typography>
          </Button>
          </Box> 

           {/*Row 2 */}
           {/* Assign Drugs Box */}
           <Box
              gridColumn="span 10"
              gridRow="span 1"
              backgroundColor={colors.dashboardColor[200]}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              borderRadius={5}
              marginTop={1}
              paddingTop={6}
              paddingBottom={6}
            >

              <Button onClick={() => setButtonAssign(true)} variant="contained" sx={{padding: "10px", width: 180, borderRadius: 5, backgroundColor: colors.dashboardColor[300]}}>          
                <Typography variant="h6">
                  Assign Drugs
                </Typography>
              </Button>
              <Assign trigger={buttonAssign} setTrigger={setButtonAssign}>
              </Assign> 
              
              <Typography variant='h6' p={1}>
                Note: Only once all eligible patients have received 5 doses you can send the results.
              </Typography>
            </Box>

            <Box
              gridColumn="span 10"
              gridRow="span 1"
              backgroundColor={colors.dashboardColor[200]}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              borderRadius={5}
              marginTop={1}
              paddingTop={6}
              paddingBottom={6}

          >
            {/*<MailOutlineOutlinedIcon sx={{color: colors.blueAccent[500]}}/>*/}

          <Button onClick={() => setButtonSend(true)} variant="contained" sx={{padding: "10px", width: 180, borderRadius: 5, backgroundColor: colors.dashboardColor[300], color: "white", mt: 1}}>
             <Typography variant="h6">
              Send Results
             </Typography>
          </Button >
          <Send trigger={buttonSend} setTrigger={setButtonSend}>
          </Send>

          <Typography variant='h6' p={1}>
              Note: Only once all eligible patients have received 5 doses you can you can send the results.
          </Typography> 
               
          </Box>  
          
        </Box> 
        
    </Box>
  )
}

export default FDADashboard;