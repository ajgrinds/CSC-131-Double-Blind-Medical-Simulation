import React, { useState, useEffect } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, CircularProgress } from "@mui/material";
import useBavaria from '../../../vendiaHooks/useBavaria';

const TrialProgress = () => {

    const { entities } = useBavaria();
    const [patients, setPatients] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{

        async function fetchPatients(){

            try{

                setIsLoading(true);
                const response = await entities.patient.list();
                console.log(response);

                setPatients(response.items.filter( patient => patient.visits != null && patient.visits.length > 0))
                setIsLoading(false);


            }catch(error){
                console.log(error);
                setIsLoading(false);
            }

        }

        const timeoutId = setTimeout(() => {
            setIsLoading(false); // Hide the spinner after 1 second
        }, 3000);

        fetchPatients();

        return () => {
            clearTimeout(timeoutId); // Clear the timeout if the component unmounts before it fires
        };

    }, [entities.patient]);

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
                    <TableCell>
                    {patient.visits.length == 5 ? "Complete" : "Active"}
                        
                    
                    </TableCell>
                    <TableCell>
                    {patient.visits.length}
                    
                    </TableCell>
                    
                    <TableCell>
                    <Button variant="outlined" color="primary">
                        button
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    



        )}

        
    
    </Box>
  )
}

export default TrialProgress;