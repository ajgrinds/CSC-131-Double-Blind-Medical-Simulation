import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import * as React from 'react';
//import StatBox from "../../components/StatBox";

const BavariaDashboard = () => {

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
            <VaccinesIcon sx={{color: colors.blueAccent[500]}}/>
            <Typography variant='h5' p={1}>
              Send Batch of Drugs
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
            <ContactsOutlinedIcon sx={{color: colors.blueAccent[500]}}/>
            <Typography variant='h5' p={1}>
               Monitor Study Progress
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
            <ReceiptOutlinedIcon sx={{color: colors.blueAccent[500]}}/>
            <Typography variant='h5' p={1}>
              Generate Post Trial Report
            </Typography>

          </Box>
        </Box> 
        
    </Box>
  )
}

export default BavariaDashboard;
