import React, { useState, useEffect } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import useBavaria from '../../../vendiaHooks/useBavaria';

const TrialProgress = () => {

    const { entities } = useBavaria();
    const [patients, setPatients] = useState([]);

    const [uuid, setUuid] = useState();
    const [visits, setVisits] = useState([]);

    useEffect(() =>{

        async function fetchPatients(){

            try{

                const response = await entities.patient.list();
                console.log(response);

                setPatients(response.items.filter( patient => patient.visits != null && patient.visits.length > 0))



            }catch(error){
                console.log(error);
            }

        }

        fetchPatients();

    }, [entities.patient]);

  return (
    
    <Box width="100%" mt={4}>
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
    
    
    </Box>
  )
}

export default TrialProgress;