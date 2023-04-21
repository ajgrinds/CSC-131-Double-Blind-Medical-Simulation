import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box } from '@mui/material';


const columns = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "time",
      headerName: "Date/Time",
      type: "dateTime",
      width: 220,
      editable: true
    },
    { 
      field: "notes", 
      headerName: "Notes", 
      width: 560, 
      editable: true 
    },
    
  ];
  
  const rows = [
    {
      id: 1,
      name: "Amber French",
      time: "5/12/2023, 10:00am",
      notes:"Smoker"
    },
    {
      id: 2,
      name: "Sion Waye",
      time: "3/17/2023, 8:30am",
      notes:"Covid Exposure"
    },
    {
      id: 3,
      name: "Gerald Diaz",
      time: "4/10/2023, 10:15am",
      notes:"Doesn't sleep"
    },
    {
      id: 4,
      name: "Jonty Hartyley",
      time: "4/11/2023, 9:20am",
      notes:"Sleep Walker"
    },
    {
      id: 5,
      name: "Hashim Ford",
      time: "3/11/2023, 11:45am",
      notes:"Tired all the time"
    }
  ];

const AppointmentGrid = () => {
  return (
    <Box sx={{ display: "flex", height: 300, width: "100%", justifyContent: "center",alignItems: "center" }}>
        <DataGrid rows={rows} columns={columns} />
    </Box>
  )
}


  

export default AppointmentGrid;