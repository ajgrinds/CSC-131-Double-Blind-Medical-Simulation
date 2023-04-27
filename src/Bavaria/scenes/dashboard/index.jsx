import { useState, useEffect } from "react";
import useBavaria from "../../../vendiaHooks/useBavaria";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";

const BavariaDashboard = () => {
  
  const [studies, setStudies] = useState([]);
  const [studyList, setStudyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { entities } = useBavaria();
  //console.log(entities.study);


  useEffect(() => {

    async function fetchStudy() {

      try {
        setIsLoading(true);
        const response = await entities.study.list();
        console.log(response);
    
       
        setStudies(response.items.map((study, index) => ({
          ...study, 
          id: index + 1,
        })));
        
      } catch(error) {
        console.log(error);
      }
    }
    fetchStudy();
    setIsLoading(false);
  }, [entities.study]);
 

  

  return (

    
    <Box m={4}>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
      
        <Box>
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
                <TableRow key={study._id}>
                  <TableCell>{study.studyName}</TableCell>
                  <TableCell>
                    {study.status}
                    
                  </TableCell>
                  <TableCell>
                    {study.startDate}
                  </TableCell>
                  <TableCell>
                    {study.endDate}
                  </TableCell>
                  <TableCell>
                    yes
                  </TableCell>
                  <TableCell>
                    {study.fdaApproved === true ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary">
                      View Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

        </Box>
        
        

      )}

      
      
    </Box>
  );
};

export default BavariaDashboard;



