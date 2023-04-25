import { Box, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import * as React from 'react';
import Button from '@mui/material/Button';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import Assign from '../../scenes/AssignDrugs/Assign.js';
import Send from '../../scenes/SendResult/Send.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FDADashboard = () => {
  const [buttonAssign, setButtonAssign] = useState(false);
  const [buttonSend, setButtonSend] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={12} md={6}>
          <Button
            component={Link}
            to="/fda/patient"
            fullWidth
            style={{ height: "250px" }}
            variant="contained"
            sx={{
              borderRadius: 15,
              backgroundColor: colors.dashboardColor[100],
              color: "white",
              mt: 0,
            }}
          >
            <SupervisorAccountIcon
              sx={{ color: colors.blueAccent[0] }}
              style={{ width: "80px", height: "120px" }}
            />
            <Typography variant="h4" p={1}>
              Patients
            </Typography>
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button
            component={Link}
            to="/fda/Studies"
            fullWidth
            style={{ height: "250px" }}
            variant="contained"
            sx={{
              borderRadius: 15,
              backgroundColor: colors.dashboardColor[100],
              color: "white",
              mt: 0,
            }}
          >
            <MailOutlineOutlinedIcon
              sx={{ color: colors.blueAccent[0] }}
              style={{ width: "45px", height: "80px" }}
            />
            <Typography variant="h4" p={1}>
              STUDIES
            </Typography>
          </Button>
        </Grid>

        {/* Row 2 */}
        {/* Assign Drugs Box */}
        <Grid item xs={12}>
          <Box
            backgroundColor={colors.dashboardColor[200]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            borderRadius={5}
            paddingTop={6}
            paddingBottom={6}
          >
            <Button
              onClick={() => setButtonAssign(true)}
              variant="contained"
              sx={{
                padding: "10px",
                width: 180,
                borderRadius: 5,
                backgroundColor: colors.dashboardColor[300],
              }}
            >
              <Typography variant="h6">Assign Drugs</Typography>
            </Button>
            <Assign trigger={buttonAssign} setTrigger={setButtonAssign}></Assign>

            <Typography variant="h6" p={1}>
              Note: Assign drugs only to eligible patients.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            backgroundColor={colors.dashboardColor[200]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            borderRadius={5}
            paddingTop={6}
            paddingBottom={6}
          >
            <Button
              onClick={() => setButtonSend(true)}
              variant="contained"
              sx={{
                padding: "10px",
                width: 180,
                borderRadius: 5,
                backgroundColor: colors.dashboardColor[300],
                color: "white",
                mt: 1,
              }}
            >
              <Typography variant="h6">Send Results</Typography>
            </Button>
            <Send trigger={buttonSend} setTrigger={setButtonSend}></Send>

            <Typography variant="h6" p={1}>
              Note: Only once all eligible patients have received 5 doses you can send the results.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FDADashboard;
