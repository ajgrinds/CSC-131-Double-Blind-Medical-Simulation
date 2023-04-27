import { useEffect, useState } from "react";

import { useParams } from 'react-router-dom';

import useJaneHopkins from '../../../vendiaHooks/useJaneHopkins';
import { tokens } from "../../theme";
import Header from "../../components/Header";

import {Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import TextField from '@mui/material/TextField'



//import StatBox from "../../components/StatBox";



const PatientDosage = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));

    const { entities } = useJaneHopkins();

    const { id } = useParams();

    const [patient, setPatient] = useState(null);

    const [visitDateTime, setVisitDateTime] = useState('');
    const [visitNotes, setVisitNotes] = useState('');
    const [visitHivViralLoad, setHivViralLoad] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [currentVisits, setCurrentVisits] = useState([]);


    useEffect(() => {
        async function fetchPatient() {
            try{
                setIsLoading(true);
                const response = await entities.patient.get(id);
                console.log(response);
                setPatient(response);
                
                if(response.visits){
                    setCurrentVisits(response.visits);
                }
                

                //console.log(currentVisits);

            }catch(error){
                console.log(error);
            }finally{
                setIsLoading(false);
            }

        };

        fetchPatient();

       
    }, [entities.patient, id]);


  
    const addNewVisit = async (event) => {
     
        try{
            setIsLoading(true);
            const newVisit = {
                dateTime: visitDateTime,
                notes: visitNotes,
                hivViralLoad: visitHivViralLoad,
            };

            const updatedVisits = [...currentVisits, newVisit];
            setCurrentVisits(updatedVisits);

            console.log("New Visits Array: ", updatedVisits);

            const response = await entities.patient.update({

                _id: id,
                visits: updatedVisits,

            });
            console.log(response);

        }catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }


    };
    
    
    const [doseTaken, setDoseTaken] = useState([false, false, false, false, false]);

    const handleDoseClick = (index) => {
      const updatedDoseTaken = [...doseTaken];
      updatedDoseTaken[index] = true;
      setDoseTaken(updatedDoseTaken);
    };

    

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: colors.greenAccent[600],
        '&:hover': {
        backgroundColor: colors.greenAccent[500],
        },
    }));

    

    return (

        <div>
            {patient ? (

            <Box m="20px">
                <Box 
                display={smScreen ? "flex" : "block"}
                flexDirection={smScreen ? "row" : "column"}
                justifyContent={smScreen ? "space-between" : "start"}
                alignItems={smScreen ? "center" : "start"}
                m="10px 0"
                >
                    <Header title="TRACK DOSAGE" subtitle="Post-Appointment Patient Information " />
                </Box>

                <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-around"  // Updated property
                    alignItems="center"
                >
                    
                    {/*<ColorButton variant="contained" size="large" onClick={handleSubmit}>Update Dose</ColorButton> */}
                
                </Box>

                <Grid
                    mt="20px"
                    container
                    rowSpacing={2}
                    columnSpacing={{xs: 1, sm: 2, md: 3, lg: 4}}
                    justifyContent="center"
                    backgroundColor={colors.primary[400]}
                >

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        width="100%"
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: '50%' },
                        }}
                        noValidate
                        autoComplete="off"
                        
                    
                    >
                        <TextField
                            id="outlined-read-only-input"
                            label="Name"
                            color='secondary'
                            defaultValue={patient.name}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        /> 


                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        component="form"
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& .MuiTextField-root': { m: 1, width: '50%' },
                        }}
                        color='secondary'
                        noValidate
                        autoComplete="off"
                        
                    
                    >
                        <TextField
                            label=""
                            variant="filled"
                            type="datetime-local"
                            value={visitDateTime}
                            onChange={(event) => setVisitDateTime(event.target.value)}
                        />


                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        component="form"
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& .MuiTextField-root': { m: 1, width: '50%' },
                        }}
                        noValidate
                        autoComplete="off"
                        
                    
                    >
                        <TextField
                            id="outlined-read-only-input"
                            label="Visit notes"
                            color='secondary'
                            variant="filled"
                            multiline
                            value={visitNotes}
                            onChange={(event) => setVisitNotes(event.target.value)}
                        />


                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        component="form"
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& .MuiTextField-root': { m: 1, width: '50%' },
                        }}
                        noValidate
                        autoComplete="off"
                        
                    
                    >
                        <TextField
                            id="outlined-read-only-input"
                            
                            label="HIV Viral Load"
                            color='secondary'
                            variant="filled"
                            value={visitHivViralLoad}
                            onChange={(event) => setHivViralLoad(event.target.value)}
                        />


                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        component="form"
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& .MuiTextField-root': { m: 1, width: '50%' },
                        }}
                        
                        
                    
                    >
                        <ColorButton variant="contained" size="large" onClick={addNewVisit}>Update Patient</ColorButton> 
                    </Grid>


                    <Grid>

                    <Box display="flex" justifyContent="center" alignItems="center" mt={{ xs: 2, sm: 3 }}>
                        {Array.from({length: currentVisits ? currentVisits.length : 0}, (_, i) => i).map((index) => (
                            <Box
                                key={index}
                                width={40}
                                height={40}
                                borderRadius="50%"
                                border='2px solid green'
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                mr={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                                mb={{ xs: 2, sm: 3 }}
                                onClick={() => handleDoseClick(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Typography variant="body1">{index + 1}</Typography>
                            </Box>
                        ))}
                    </Box>



                    </Grid>


                </Grid>
                    
            </Box>

            ) : (
                <p>Loading</p>
            )}



        </div>
        
    )
}

export default PatientDosage;