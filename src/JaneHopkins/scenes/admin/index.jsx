import { useState } from "react";
import {Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


//import StatBox from "../../components/StatBox";

const Admin = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: colors.greenAccent[600],
    '&:hover': {
      backgroundColor: colors.greenAccent[500],
    },
  }));

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

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 
         
          <Grid xs={12} sm={12} md={12} lg={4} xl={4}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{height: 300}}
            >
              <Box sx={{ml: "30px"}}>

                <Box sx={{display: "flex", alignContent: "center"}} mt="20px" ml="50px">
                
                </Box>

              </Box>
                
            </Box>

          </Grid>
          <Grid xs={12} sm={12} md={12} lg={8} xl={8}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{height: 300}}
            >
            
            </Box>
          </Grid>
        </Grid>
    </Box>
  )
}

export default Admin;