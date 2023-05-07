import { useState, useEffect } from "react";
import useBavaria from "../../../vendiaHooks/useBavaria";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, CircularProgress } from "@mui/material";
import TrialProgress from "../trialProgress";
import { Link } from "react-router-dom";



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

        setIsLoading(false);
        
      } catch(error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    const timeoutId = setTimeout(() => {
      setIsLoading(false); // Hide the spinner after 1 second
    }, 3000);

    fetchStudy();

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts before it fires
    };


   
  }, [entities.study]);
 

  

  return (

    
    <Box m={4}>

      {isLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <CircularProgress/>
        </Box>
        
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
                    <TableCell style={{fontWeight: 'bold'}}>Study Name</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Status</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Start Date</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>End Date</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Approved by Bavaria</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Approved by FDA</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}></TableCell>
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
                        <Link to={`/Bavaria/report/${study._id}`}>
                        <Button variant="outlined" color="primary">
                          View Report
                        </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Box>
          
          <Box mt='50px'>

            <Typography variant="h4" gutterBottom>
              Clinical Trails Progress 
            </Typography>

            {studies.some(study => study.fdaApproved === true) ? "No current trials, awaiting FDA approval..." :  <TrialProgress />}
          </Box>
            

          

          

        </Box>
        
        

      )}

      
      
    </Box>
  );
};

export default BavariaDashboard;



