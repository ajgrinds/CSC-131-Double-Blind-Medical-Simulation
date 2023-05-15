import React, { useState } from 'react';
import { TextField, Select, Button, Grid, Box, Typography } from '@mui/material';
import useBavaria from '../../../vendiaHooks/useBavaria';
import Switch from '@mui/material/Switch';


const CreateDrug = () => {
  

  const { entities } = useBavaria();

  const [studyName, setStudyName] = useState("");
  const [status, setStatus] = useState("Pending");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fdaApproved, setFdaApproved] = useState(false);
  const [drugId, setDrugId] = useState("");
  const [placeboId, setPlaceboId] = useState("");
  const [studyComplete, setStudyComplete] = useState(false);
  const [batchNumber, setBatchNumber] = useState("");
  const [placebo, setPlacebo] = useState(false); 

  const [isLoading, setIsLoading] = useState(false);

  const handleStudyName = (event) => {
    setStudyName(event.target.value);
  }

  const handleBatchNumber = (event) => {
    setBatchNumber(event.target.value);
  }

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  }

  const handleEndDate = (event) => {
    setEndDate(event.target.value);
  }

  const handleDrugId = (event) => {
    setDrugId(event.target.value);
  }

  const handlePlaceboId = (event) => {
    setPlaceboId(event.target.value);
  }

  
  const handleAddDrug = async () => {
    setIsLoading(true);
    const response = await entities.drug.add({
        batchNumber: batchNumber,
        id: drugId,
        placebo: false,
    });

    console.log(response);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    

  }

  const handleAddPlacebo = async () => {
    setIsLoading(true);
    const response = await entities.drug.add({
        batchNumber: batchNumber,
        id: placeboId,
        placebo: true,
    });

    console.log(response);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

  }


  const handleAddStudy = async () => {
    setIsLoading(true);

    const response = await entities.study.add({
      studyName: studyName,
      status: status,
      startDate: startDate,
      endDate: endDate,
      fdaApproved: false,
      drugId: drugId,
      placeboId: placeboId,
      studyComplete: false,
    })

    console.log(response);

    handleAddPlacebo();
    handleAddDrug();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);


    window.location.href= "/Bavaria/"

  }

  return (
    
    <Box>

      <Box display="flex" justifyContent="center">
        <Typography variant="h6">
          Add New Study
        </Typography>

      </Box>
      

      <Grid 
        mt="20px"
        container
        rowSpacing={2}
        columnSpacing={{xs: 1, sm: 2, md: 3, lg: 4}}
        justifyContent="center"
        sx={{
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)',
            width: '100%',
          

        }}
      
      >

        <Grid 
            item
            xs={12}
            sm={6}
            md={4}
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiTextField-root': { m: 1, width: '100%' },
              textAlign: 'center',
              position: 'relative',
            }}
            noValidate
            autoComplete="off"
        
        >
            <TextField
              id="outlined-read-only-input"
              label="Study Name"
              color='secondary'
              defaultValue=""
              onChange={handleStudyName}
              variant="filled"
            />
        </Grid>

        <Grid 
            item
            xs={12}
            sm={6}
            md={4}
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiTextField-root': { m: 1, width: '100%' },
              textAlign: 'center',
              position: 'relative',
            }}
            noValidate
            autoComplete="off"
        
        >
            <TextField
              type="date"
              onChange={handleStartDate}
              variant="outlined"
            />
        </Grid>

        <Grid 
            item
            xs={12}
            sm={6}
            md={4}
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiTextField-root': { m: 1, width: '100%' },
              textAlign: 'center',
              position: 'relative',
            }}
            noValidate
            autoComplete="off"
        
        >
            <TextField
              type="date"
              onChange={handleEndDate}
              variant="outlined"
            />
        </Grid>

        <Grid 
            item
            xs={12}
            sm={6}
            md={4}
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiTextField-root': { m: 1, width: '100%' },
              textAlign: 'center',
              position: 'relative',
            }}
            noValidate
            autoComplete="off"
        
        >
            <TextField
                id="outlined-read-only-input"
                label="Drug ID"
                color='secondary'
                defaultValue=""
                onChange={handleDrugId}
                variant="filled"
            />
        </Grid>

        <Grid 
            item
            xs={12}
            sm={6}
            md={4}
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiTextField-root': { m: 1, width: '100%' },
              textAlign: 'center',
              position: 'relative',
            }}
            noValidate
            autoComplete="off"
        
        >
            <TextField
                id="outlined-read-only-input"
                label="Placebo ID"
                color='secondary'
                defaultValue=""
                onChange={handlePlaceboId}
                variant="filled"
            />
        </Grid>
        <Grid 
            item
            xs={12}
            sm={6}
            md={4}
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiTextField-root': { m: 1, width: '100%' },
              textAlign: 'center',
              position: 'relative',
            }}
            noValidate
            autoComplete="off"
        
        >
            
            <TextField
                id="outlined-read-only-input"
                label="Batch #"
                color='secondary'
                defaultValue=""
                onChange={handleBatchNumber}
                variant="filled"
            />
        </Grid>
        
        <Grid 

            item
            xs={12}
            sm={6}
            md={4}
            
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '100%' },
            textAlign: 'center',
            position: 'relative',
            }}
            
            mb='20px'
        
        >
          <Button type="submit" variant="contained" color="primary" onClick={handleAddStudy}>
            Add Study
          </Button>

          
        </Grid>
      </Grid>


    </Box>

      
   
  );
};

export default CreateDrug;
