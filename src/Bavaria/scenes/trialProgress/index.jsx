import React, { useState, useEffect } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, CircularProgress, Modal } from "@mui/material";
import useBavaria from '../../../vendiaHooks/useBavaria';
import PatientDetails from '../patientDetails';

const TrialProgress = () => {

    const { entities } = useBavaria();
    const [patients, setPatients] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false); 

    const [id, setId] = useState(null);

    

    

    useEffect(() =>{

        async function fetchPatients(){

            try{

                setIsLoading(true);
                const response = await entities.patient.list();
                console.log(response);

                setPatients(response.items.filter( patient => patient.visits != null && patient.visits.length > 0 ))
                setIsLoading(false);


            }catch(error){
                console.log(error);
                setIsLoading(false);
            }

        }
        fetchPatients();
    }, [entities.patient]);



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

      const handleView = (id) => { // <-- Add this function
        
        setId(id);
        setOpen(true);
    }

  return (
    
    <Box width="100%" mt={4}>

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

            <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell style={{fontWeight: 'bold'}}>Patient UUID</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Status</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Total Shots</TableCell>
                
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {patients.map(patient => (
                <TableRow key={patient._id}>
                    <TableCell>
                    {patient.uuid}
                    </TableCell>
                    <TableCell style={{ color: patient.visits.length === 5 ? 'green' : 'orange' }}>
                    {patient.visits.length === 5 ? "Complete" : "Active"}
                        
                    
                    </TableCell>
                    <TableCell>
                    {patient.visits.length}
                    
                    </TableCell>
                    
                    <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleView(patient._id)}>
                        View
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        )}

        <Modal open={open} onClose={() => setOpen(false)}>
            <Box 
                sx={{
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    bgcolor: 'background.paper', 
                    boxShadow: 24, p: 4
                }}
            >
                <PatientDetails id={id}/>
                
            </Box>

                            
        </Modal>

        
    
    </Box>
  )
}

export default TrialProgress;