import { useState } from "react";
import useBavaria from "../../../vendiaHooks/useBavaria";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";

const BavariaDashboard = () => {
  
  const [studies, setStudies] = useState([
    {
      id: 1,
      name: "Study 1",
      status: "Pending",
      startDate: "",
      endDate: "",
      approvedByBavaria: false,
      approvedByFDA: false,
    },
    {
      id: 2,
      name: "Study 2",
      status: "Active",
      startDate: "2023-01-01",
      endDate: "",
      approvedByBavaria: true,
      approvedByFDA: false,
    },
    {
      id: 3,
      name: "Study 3",
      status: "Complete",
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      approvedByBavaria: true,
      approvedByFDA: true,
    },
  ]);

 

  const handleStatusChange = (id, value) => {
    setStudies(prevStudies =>
      prevStudies.map(study =>
        study.id === id ? { ...study, status: value } : study
      )
    );
  };

  const handleStartDateChange = (id, value) => {
    setStudies(prevStudies =>
      prevStudies.map(study =>
        study.id === id ? { ...study, startDate: value } : study
      )
    );
  };

  const handleEndDateChange = (id, value) => {
    setStudies(prevStudies =>
      prevStudies.map(study =>
        study.id === id ? { ...study, endDate: value } : study
      )
    );
  };

  const handleApprovedByBavariaChange = (id, value) => {
    setStudies(prevStudies =>
      prevStudies.map(study =>
        study.id === id ? { ...study, approvedByBavaria: value } : study
      )
    );
  };

  const handleApprovedByFDAChange = (id, value) => {
    setStudies(prevStudies =>
      prevStudies.map(study =>
        study.id === id ? { ...study, approvedByFDA: value } : study
      )
    );
  };

  return (
    <Box m={4}>
      <Typography variant="h4" gutterBottom>
        Drug Trial Progress
      </Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" mb={4}>
        <Box width="30%" p={2} boxShadow={1} borderRadius={2}>
          <Typography variant="h6" gutterBottom>
            Pending Studies
          </Typography>
          <Typography variant="h4">
            {studies.filter(study => study.status === "Pending").length}
          </Typography>
        </Box>
        <Box width="30%" p={2} boxShadow={1} borderRadius={2}>
          <Typography variant="h6" gutterBottom>
            Active Studies
          </Typography>
          <Typography variant="h4">
            {studies.filter(study => study.status === "Active").length}
          </Typography>
        </Box>
        <Box width="30%" p={2} boxShadow={1} borderRadius={2}>
          <Typography variant="h6" gutterBottom>
            Complete Studies
          </Typography>
          <Typography variant="h4">
            {studies.filter(study => study.status === "Complete").length}
          </Typography>
        </Box>
      </Box>
      <Box width="100%" mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Study Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Approved by Bavaria</TableCell>
                <TableCell>Approved by FDA</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studies.map(study => (
                <TableRow key={study.id}>
                  <TableCell>{study.name}</TableCell>
                  <TableCell>
                    <TextField
                      select
                      value={study.status}
                      onClick={event => handleStatusChange(study.id, event.target.value)}
                      variant="outlined"
                      sx={{cursor:"pointer"}}
                      
                    >
                      <option value="Pending" style={{ cursor: 'pointer' }}>Pending</option>
                      <option value="Active" style={{ cursor: 'pointer' }}>Active</option>
                      <option value="Complete" style={{ cursor: 'pointer' }}>Complete</option>
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      value={study.startDate}
                      onChange={event => handleStartDateChange(study.id, event.target.value)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      value={study.endDate}
                      onChange={event => handleEndDateChange(study.id, event.target.value)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      value={study.approvedByBavaria}
                      onChange={event => handleApprovedByBavariaChange(study.id, event.target.value)}
                      variant="outlined"
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      value={study.approvedByFDA}
                      onChange={event => handleApprovedByFDAChange(study.id, event.target.value)}
                      variant="outlined"
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary">
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default BavariaDashboard;



