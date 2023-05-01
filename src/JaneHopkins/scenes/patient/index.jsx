import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import useJaneHopkins from "../../../vendiaHooks/useJaneHopkins";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const Patient = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {entities} = useJaneHopkins();
    const [patientList, setPatientList] = useState([]);
    const [studyList, setStudyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);

    const [age, setAge] = useState('');
    const [Studies, setStudies] = useState('');

    const handleChange = (event, row) => {
        const value = event.target.value;
        console.log(value)
        console.log(row._id)
        entities.patient.update({_id: row._id, study: value});
        setReload(!reload);
    };
    

    useEffect(() => {
        async function fetchData() {

            try{

                const response = await entities.patient.list();
                console.log(response);
                setPatientList(response.items.map((patient, index) => ({
                    ...patient,
                    id: index + 1,

                })));
                setStudies(await entities.study.list());
            } catch(error){
                console.log(error);
            } finally{
                setIsLoading(false);
            }
        }

        fetchData();
        
    }, [entities.patient, reload]);

    

    const columns = [
        {   
            field: "uuid", 
            headerName: "UUID",
            flex:1,           
        }, 
        {
            field: "study", 
            headerName: "Study",
            flex:1,  
            renderCell: (params) => (
                <FormControl fullWidth>
                  <Select
                    defaultValue={params.row.study == null ? "" : params.row.study}
                    label="Study"
                    value={params.row.study == null ? "" : params.row.study}
                    onChange={(event) => handleChange(event, params.row)}
                  >  
                    {Studies.items.map((study, index) => (
                        <MenuItem key={index+1} value={study.studyName}>
                            {study.studyName}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            )
        },
        {
            field: "name", 
            headerName: "Name", 
            flex: 1, 
            cellClassName: "name-column--cell"
        },
        {
            field: "dob",
            headerName: "DOB",
            flex : 1,
        }, 
        {
            field: "address", 
            headerName: "Address", 
            flex: 2, 
        }, 
        {
            field: "insuranceNumber", 
            headerName: "Insurance #", 
            flex: 1, 
        },
        {
            field: "view",
            headerName: "View/Edit",
            width: 100,
            renderCell: (params) => (
                <Link style={{textDecoration: "none"}} to={`/JaneHopkins/patient/${params.row._id}`}>
                    <Button 
                        variant="contained" 
                        style={{ backgroundColor: colors.blueAccent[600]}} 
                        
                    > 
                        View/Edit
                    </Button>
                </Link>     
            ),
        },
        
    ];

    return(
        <Box m="20px">

            <Header title="PATIENTS" subtitle="Managing Patients"/>
            <Box m="30px 0 0 0" height="75vh"
                sx={{
                    "& .MuiDataGrid-root":{
                        border: "none",
                    },
                    "& .MuiDataGrid-cell":{
                        borderBottom :"none",
                    },
                    "& .name-column--cell":{
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-columnHeaders":{
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller":{
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer":{
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    }
                }}
            >
                {isLoading ? (
                    <Box>Loading...</Box>
                ) : (
                    <DataGrid rows={patientList} columns={columns} initialState={{
                        sorting: {
                          sortModel: [{ field: 'study', sort: 'desc' }],
                        },
                      }}/>
                )}
                
            </Box>
        </Box>
    )

}

export default Patient;
