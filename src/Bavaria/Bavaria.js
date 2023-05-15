import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import BavariaDashboard from "./scenes/dashboard";
import ResponsiveAppBar from "./scenes/navbar";
import CreateDrug from "./scenes/createDrug";

function Bavaria() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ResponsiveAppBar />
      <Grid container spacing={3} sx={{ mt: "20px" }}>
        <Grid item xs={12}>
          <Routes>
            <Route path="/" element={<BavariaDashboard />} />
            <Route path="/createDrug" element={<CreateDrug />} />
          </Routes>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Bavaria;
