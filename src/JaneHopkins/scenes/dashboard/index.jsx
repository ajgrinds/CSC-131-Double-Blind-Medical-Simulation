import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
//import StatBox from "../../components/StatBox";



const Dashboard = () => {

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
          >
            Hello
          </Box>

          <Box 
            gridColumn="span 4" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center"
            justifyContent="center"
          >
            <PeopleOutlinedIcon sx={{color: colors.greenAccent[500]}}/>
            <Typography>Patients</Typography>
          
          </Box>

          <Box 
            gridColumn="span 4" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center"
            justifyContent="center"
          >
            Hello
          </Box>

            {/*Row 2 */}

          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            
          >
            
            <Typography variant="h3" fontWeight="500" color={colors.greenAccent[500]}>
              Put Somthing Here
            </Typography>

          
          </Box>

          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="500" color={colors.greenAccent[500]}>
              Put Something Here
            </Typography>
          </Box>
          

        </Box>
        
        
        

        
    </Box>
  )
}

export default Dashboard;