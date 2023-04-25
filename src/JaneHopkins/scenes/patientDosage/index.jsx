import { useState } from "react";
import {Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import useJaneHopkins from '../../../vendiaHooks/useJaneHopkins';
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import TextField from '@mui/material/TextField'



//import StatBox from "../../components/StatBox";



const PatientDosage = () => {
    
    const { entities } = useJaneHopkins();
    const [patientName, setPatientName] = useState('');
    const [visitDateTime, setVisitDateTime] = useState('');
    const [visitNotes, setVisitNotes] = useState('');
    const [visitHivViralLoad, setHivViralLoad] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const patientEntity = entities.patient.find((entity) => entity.name === patientName);
  
      if (!patientEntity) {
        console.error(`Could not find patient with name: ${patientName}`);
        return;
      }
  
      const visitEntity = {
        patient: patientEntity.uuid,
        dateTime: visitDateTime,
        notes: visitNotes,
        hivViralLoad: visitHivViralLoad,
      };
  
      await entities.visits.create(visitEntity);
      
      setVisitDateTime('');
      setVisitNotes('');
      setHivViralLoad('');
      
    };
    
    
    const [doseTaken, setDoseTaken] = useState([false, false, false, false, false]);

    const handleDoseClick = (index) => {
      const updatedDoseTaken = [...doseTaken];
      updatedDoseTaken[index] = true;
      setDoseTaken(updatedDoseTaken);
    };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: colors.greenAccent[600],
    '&:hover': {
      backgroundColor: colors.greenAccent[500],
    },
  }));

  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box mx={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }} my={{ xs: 4, sm: 6, md: 8, lg: 10, xl: 12 }}>
        <Box
            display={{ xs: 'block', sm: 'flex' }}
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent={{ xs: 'start', sm: 'space-between' }}
            alignItems={{ xs: 'start', sm: 'center' }}
            my={{ xs: 2, sm: 4 }}
        >
        <Header title="TRACK DOSAGE" subtitle="Post-Appointment Patient Information " />
    </Box>

        <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 
          
        <Grid xs={12} sm={12} md={12} lg={8} xl={8}>
            <Box
                minWidth={{ xs: '100%', sm: 'auto' }}
                minHeight={{ xs: 400, sm: 500 }}
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={{ xs: 1, sm: 2 }}
            >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxWidth={{ xs: '100%', sm: '80%' }}
                width={{ xs: '100%', sm: 'auto' }}
            >
            <Typography variant="h5" component="h2" color="textPrimary" gutterBottom>
            Patient Information
            </Typography>

            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, minWidth: { xs: '100%', sm: '25ch' } },
                }}
                noValidate
                autoComplete="off"
            >
                 <form onSubmit={handleSubmit}>
                    <TextField
                        label="Patient Name"
                        value={patientName}
                        onChange={(event) => setPatientName(event.target.value)}
                    />
                    <br />
                    <TextField
                        label=""
                        type="datetime-local"
                        value={visitDateTime}
                        onChange={(event) => setVisitDateTime(event.target.value)}
                    />
                    <br />
                    <TextField
                        label="Visit Notes"
                        multiline
                        value={visitNotes}
                        onChange={(event) => setVisitNotes(event.target.value)}
                    />
                    <br />
                    <TextField
                        label="HIV Viral Load"
                        type="number"
                        value={visitHivViralLoad}
                        onChange={(event) => setHivViralLoad(event.target.value)}
                    />
                    <br />

                    <Button variant="contained" color="primary" type="submit">
                        Save Visit Info
                    </Button>

                    </form>
               

            <Box display="flex" flexDirection="column" alignItems="center" mt={{ xs: 4, sm: 6 }}>
            <Typography variant="h6">Dose Tracker</Typography>
            <Box display="flex" justifyContent="center" alignItems="center" mt={{ xs: 2, sm: 3 }}>
                {[0, 1, 2, 3, 4].map((index) => (
                <Box
                    key={index}
                    width={40}
                    height={40}
                    borderRadius="50%"
                    border={doseTaken[index] ? '2px solid green' : '2px solid grey'}
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
            </Box>


            <Box textAlign="center" mt="30px"> 
                <ColorButton size="large" variant="contained" >Update Dose</ColorButton>
            </Box>
            </Box>
            </Box>
        </Box>
        </Grid>

    

    </Grid>
</Box>
  )
}

export default PatientDosage;