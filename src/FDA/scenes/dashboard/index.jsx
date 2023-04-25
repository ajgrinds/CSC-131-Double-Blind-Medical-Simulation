import {
  Box, 
  Typography, 
  useTheme, 
  useMediaQuery
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FlagIcon from '@mui/icons-material/Flag';
import * as React from 'react';
import Button from '@mui/material/Button';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { NoBackpackSharp } from "@mui/icons-material";

//import StatBox from "../../components/StatBox";

const FDADashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));


  return (
    <Box m="20px">

        <Box 
          display={smScreen ? "flex" : "block"}
          flexDirection={smScreen ? "row" : "column"}
          justifyContent={smScreen ? "space-between" : "start"}
          alignItems={smScreen ? "center" : "start"}
          m="10px 0"
        >
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>

        <Grid 
          container 
          rowSpacing={1} 
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >

          <Grid xs={12} sm={12} md={12} lg={4} xl={4}>
            <Box
              
              
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{height: 150}}
          
            >

              <Button 
                style= {{width:"1000px", height:"150px"}} 
                variant="contained"  
                sx={{borderRadius: 15, backgroundColor: colors.dashboardColor[100], color: "white", mt: 0}}
              >
                <SupervisorAccountIcon 
                  sx={{color: colors.blueAccent[0]}} 
                  style={{width:"80px", height:"120px"}}/>
                <Typography variant='h4' p={1}>
                  Patients Info
                </Typography>
              </Button>  

              

            </Box>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={4} xl={4}>
            <Box
              
              
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{height: 150}}
          
            >

              <Button 
                style= {{width:"1000px", height:"150px"}} 
                variant="contained"  
                sx={{borderRadius: 15, backgroundColor: colors.dashboardColor[100], color: "white", mt: 0}}
              >
                <SupervisorAccountIcon 
                  sx={{color: colors.blueAccent[0]}} 
                  style={{width:"80px", height:"120px"}}/>
                <Typography variant='h4' p={1}>
                  Patients Info
                </Typography>
              </Button>  

              

            </Box>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={4} xl={4}>
            <Box
              
              
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{height: 150}}
          
            >

              <Button 
                style= {{width:"1000px", height:"150px"}} 
                variant="contained"  
                sx={{borderRadius: 15, backgroundColor: colors.dashboardColor[100], color: "white", mt: 0}}
              >
                <SupervisorAccountIcon 
                  sx={{color: colors.blueAccent[0]}} 
                  style={{width:"80px", height:"120px"}}/>
                <Typography variant='h4' p={1}>
                  Progress Report
                </Typography>
              </Button>  

              

            </Box>
          </Grid>

        </Grid>
        
        
        <Box
          display="gtid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          justifyContent="space-between"
        >
          {/*Row 1 */}

          {/*<Button style={{width:"500px", height:"300px"}} variant="contained"  sx={{borderRadius: 15, backgroundColor: colors.blueAccent[200], color: "white", mt: 0}}>
            <MedicalServicesIcon sx={{color: colors.primary[500]}} style={{width:"45px", height:"80px"}}/>
              <Typography variant='h4' p={1} color={colors.primary[500]}>
                Drugs
              </Typography>
              </Button>*/}

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
              {/*<AssignmentOutlinedIcon sx={{color: colors.blueAccent[500]}}/>*/}

              <Button variant="contained" sx={{padding: "10px", width: 180, borderRadius: 40, backgroundColor: colors.dashboardColor[300], color: "white", mt: 1}}>
              <Typography variant="h6">
                Assign Drugs
                </Typography>
              </Button>
              <Typography variant='h6' p={1}>
                Note: Assing drugs only to eligible patients
              </Typography>
          </Box>  

          {/* Send Results Box */}
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

            <Button variant="contained" sx={{padding: "10px", width: 180, borderRadius: 40, backgroundColor: colors.dashboardColor[300], color: "white", mt: 1}}>
             <Typography variant="h6" fontWeight={"10"}>
              Send Results
              </Typography>
          </Button >
          <Typography variant='h6' p={1}>
              Note: Only once all eligible patients have received 5 doses you can you can send the results.
            </Typography> 
            
          </Box>
          
        </Box> 
        
    </Box>
  )
}

export default FDADashboard;
