import React, { useState, useEffect } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import useBavaria from "../../../vendiaHooks/useBavaria";

const BavariaPatients = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {entities} = useBavaria();
    const [patientList, setPatientList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {

            try{
                const response = await entities.patient.list();
                console.log(response);
                setPatientList(response.items.map((patient, index) => ({
                    id: index + 1,
                    name: patient.name
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
            field: "id", 
            headerName: "ID",
            flex: 1           
        }, 
        {
            field: "name", 
            headerName: "Name", 
            flex: 1,
            cellClassName: "name-column--cell"
        }
    ];

    return (
        <Box m="20px">
            <Header title="Bavaria PATIENTS" subtitle="Managing Bavaria Patients"/>
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
    );
}

export default BavariaPatients;