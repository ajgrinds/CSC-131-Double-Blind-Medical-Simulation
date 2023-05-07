import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import useBavaria from '../../../vendiaHooks/useBavaria';

const FinalReport = () => {

    const { entities } = useBavaria();
    const [studies, setStudies] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{

        async function fetchStudies(){

            try{

                setIsLoading(true);
                const response = await entities.study.list();
                console.log(response);

                setStudies(response.items.filter( study => study._id === id))
                setIsLoading(false);


            }catch(error){
                console.log(error);
                setIsLoading(false);
            }

        }

        async function fetchDrugs(){
            try{

                setIsLoading(true);
                const response = await entities.drug.list();
                console.log(response);

                setDrugs(response.items.filter( drug => drug.batchNumber != null))
                setIsLoading(false);


            }catch(error){
                console.log(error);
                setIsLoading(false);
            }
        }

        const timeoutId = setTimeout(() => {
            setIsLoading(false); // Hide the spinner after 1 second
        }, 3000);

        fetchStudies();
        fetchDrugs();

        return () => {
            clearTimeout(timeoutId); // Clear the timeout if the component unmounts before it fires
        };

    }, [entities.study, entities.drug]);

    function countDrugsWithIds(drugId, placeboId, drugs) {
        return drugs.filter(drug => drug.id === drugId || drug.id === placeboId).length;
    }

    function countPlacebosWithIds( placeboId, drugs) {
        return drugs.filter(drug => drug.id === placeboId).length;
    }

    const numDrugs = countDrugsWithIds('123', '321', drugs)
    const numPlacebo = countPlacebosWithIds('321', drugs)
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
                <TableCell style={{fontWeight: 'bold'}}>Study Name</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Status</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Start</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>End</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Success</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Drug ID</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Placebo ID</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Total # of Drugs</TableCell>
                <TableCell style={{fontWeight: 'bold'}}># of Placebos</TableCell>

                
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {studies.map(study => (
                <TableRow key={study._id}>
                    <TableCell>
                    {study.studyName}
                    </TableCell>
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
                    {study.fdaApproved}
                    </TableCell>
                    <TableCell>
                    {study.drugId}
                    </TableCell>
                    <TableCell>
                    {study.placeboId}
                    </TableCell>
                    <TableCell>
                    {numDrugs}
                    </TableCell>
                    <TableCell>
                    {numPlacebo}
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

export default FinalReport;