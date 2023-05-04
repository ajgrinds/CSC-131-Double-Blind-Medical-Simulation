import { useState, useEffect } from "react";
import useBavaria from "../../../vendiaHooks/useBavaria";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, CircularProgress } from "@mui/material";
import TrialProgress from "../trialProgress";



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
 

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "Red";
      case "Active":
        return "Orange";
      case "Complete":
        return "Green";
      default:
        return "inherit";
    }
  };

  

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
                Created Studies
              </Typography>
              <Typography variant="h4">
                {studies.filter(study => study.status === "Created").length}
              </Typography>
            </Box>
            <Box width="30%" p={2} boxShadow={1} borderRadius={2}>
              <Typography variant="h6" gutterBottom>
                Active Studies
              </Typography>
              <Typography variant="h4">
                {studies.filter(study => study.status === "In Progress").length}
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
                      <TableCell style={{ color: getStatusColor(study.status) }}>
                        {study.status}
                        
                      </TableCell>
                      <TableCell>
                        {study.startDate}
                      </TableCell>
                      <TableCell>
                        {study.endDate}
                      </TableCell>
                      <TableCell style={{color: "green"}}>
                        yes
                      </TableCell>
                      <TableCell>
                        {study.status !== "Created" && study.status !== "Cancelled" ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          disabled={study.status !== "Complete"}
                          sx={{
                            borderColor: study.status !== "Complete" ? "grey" : "",
                            color: study.status !== "Complete" ? "grey" : "primary",
                          }}
                        >
                          View Report
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          disabled={study.status !== "Complete"}
                          sx={{
                            borderColor: study.status !== "Complete" ? "grey" : "",
                            color: study.status !== "Complete" ? "grey" : "primary",
                          }}
                        >
                          Send Drugs
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Box>
          
          <Box mt='50px'>

            <Typography variant="h4" gutterBottom>
              Clinical Trials Progress 
            </Typography>

            {studies.some(study => study.fdaApproved === true) ? "No current trials, awaiting FDA approval..." :  <TrialProgress />}
          </Box>
            

          

          

        </Box>
        
        

      )}

      
      
    </Box>
  );
};

export default BavariaDashboard;



