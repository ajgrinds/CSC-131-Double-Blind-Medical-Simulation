import React, { useState } from "react";
import {
  Box, 
  Typography, 
  useTheme, 
  useMediaQuery
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import AppointmentGrid from "../../components/AppointmentGrid";
import { Link } from "react-router-dom";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PersonAddIcon from '@mui/icons-material/PersonAdd';





const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));


  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');
  const todayStartOfTheDay = today.startOf('day');
  const [status, getStatus] = useState("Not Complete");

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: colors.greenAccent[600],
    '&:hover': {
      backgroundColor: colors.greenAccent[500],
    },
  }));

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

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 
          <Grid xs={12} sm={12} md={12} lg={4} xl={4}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{height: 150}}
            >
              <VaccinesIcon sx={{display: "flex", fontSize: 70, color: colors.greenAccent[500]}}/>
              <Link
    
                  display="flex"
                  component="button"
                  variant="body2"
                  color={colors.greenAccent[500]}
                  style={{ textDecoration: "none"}}
                  to="/JaneHopkins/trackdosage"

              >
                <Typography variant="h6" fontWeight="500" color={colors.greenAccent[500]}>
                  Track Dosage
                </Typography>
              </Link>
            </Box>
          
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={4} xl={4}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{height: 150}}
            >
              <PeopleOutlinedIcon sx={{display: "flex", fontSize: 70, color: colors.greenAccent[500]}}/>
              <Link
    
                  display="flex"
                  component="button"
                  variant="body2"
                  color={colors.greenAccent[500]}
                  style={{ textDecoration: "none"}}
                  to="/JaneHopkins/patient"

              >
              <Typography variant="h6" fontWeight="500" color={colors.greenAccent[500]}>
                View Patients
              </Typography>
              </Link>
          
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={4} xl={4}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{height: 150}}
            >
              <PersonAddIcon sx={{display: "flex", fontSize: 60, color: colors.greenAccent[500]}}/>
              <Link
    
                  display="flex"
                  component="button"
                  variant="body2"
                  color={colors.greenAccent[500]}
                  style={{ textDecoration: "none"}}
                  to="/JaneHopkins/addpatient"

              >
                <Typography variant="h6" fontWeight="500" color={colors.greenAccent[500]}>
                  Add New Patient
                </Typography>
              </Link>
            </Box>
          </Grid>
         
          <Grid xs={12} sm={12} md={12} lg={8} xl={8}>
          <Box
              marginTop='10px'
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{height: "100%"}}
            >
              <AppointmentGrid style={{ height: "100%" }}/>
            </Box>
          </Grid>
        </Grid>
    </Box>
  );
};

export default Dashboard;
