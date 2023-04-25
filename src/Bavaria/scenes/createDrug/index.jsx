import React, { useState } from 'react';
import { TextField, Select, Button, Grid, Box } from '@mui/material';
import useBavaria from '../../../vendiaHooks/useBavaria';
import Switch from '@mui/material/Switch';


const CreateDrug = () => {
  const [drugName, setDrugName] = useState('');
  const [drugType, setDrugType] = useState('');

  const { entities } = useBavaria();

  const [batchNumber, setBatchNumber] = useState("");
  const [placebo, setPlacebo] = useState("false");
  const [id, setID] = useState("");

  const handleBatchNumber = (event) => {
    setBatchNumber(event.target.value);
  }

  const handlePlacebo = (event) => {
    setPlacebo(event.target.checked);
  }
  

  const handleID = (event) => {
    setID(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add code here to submit the form data to a backend API or store it in state
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleAddDrug = async () => {
    setIsLoading(true);
    const response = await entities.drug.add({
        batchNumber: batchNumber,
        id: id,
        placebo: placebo,
       

    });

    console.log(response);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

  }

  return (
    
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
              label="Batch Number"
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
                label="id"
                color='secondary'
                defaultValue=""
                onChange={handleID}
                variant="filled"
            />
        </Grid>
        
        <Grid 

            mt="20px"
            container
            rowSpacing={2}
            columnSpacing={{xs: 1, sm: 2, md: 3, lg: 4}}
            justifyContent="center"
        
        >
          <Switch onChange={handlePlacebo}/>
          <Box mt="8px">Placebo</Box>
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
            
            
        
        >
          <Button type="submit" variant="contained" color="primary" onClick={handleAddDrug}>
            Add Drug
          </Button>

          
        </Grid>
      </Grid>
   
  );
};

export default CreateDrug;
