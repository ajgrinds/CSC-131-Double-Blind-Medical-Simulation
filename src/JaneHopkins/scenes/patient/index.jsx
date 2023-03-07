import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import useJaneHopkins from "../../../vendiaHooks/useJaneHopkins";



const Patient = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {entities} = useJaneHopkins();
    const [patientList, setPatientList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {

            try{

                const response = await entities.patient.list();
                console.log(response);
                setPatientList(response.items.map((patient, index) => ({
                    ...patient,
                    id: index + 1,

                }))); 
            } catch(error){
                console.log(error);
            } finally{
                setIsLoading(false);
            }
        }

        fetchData();
        
    }, [entities.patient]);

    const columns = [

        {   
            field: "uuid", 
            headerName: "UUID",
            flex:1,           
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
                
                <Link style={{textDecoration: "none"}} to={`/patient/${params.row._id}`}>
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
                    <DataGrid rows={patientList} columns={columns}/>
                )}
                
            </Box>
        </Box>
    )

}

export default Patient;
