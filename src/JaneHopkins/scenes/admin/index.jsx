import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import useJaneHopkins from "../../../vendiaHooks/useJaneHopkins";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


const Patient = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: colors.greenAccent[600],
      '&:hover': {
        backgroundColor: colors.greenAccent[500],
      },
    }));

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
            field: "dob",
            headerName: "DOB",
            flex : 1,
        }, 

        {
          field: "visits",
          headerName: "Dose #",
          flex : 1,
          valueGetter: (params) => params.row.visits ? params.row.visits.length : 0,
      }, 
       
        {
            field: "view",
            headerName: "Eligible Patient",
            width: 150,
            renderCell: (params) => (
                
                    <Button 

                        variant="contained" 
                        style={{ backgroundColor: colors.blueAccent[600]}} 
                        
                    > 
                      ELIGIBLE
                    </Button>
                     
            ),
        },
        
    ];

    return(
        <Box m="20px">

          <Box position="absolute" right="0" pr={{ xs: 1, md: 2 }} py={{ xs: 1, md: 2 }}>
                <ColorButton variant="contained" size ='large' style={{ marginRight: "16px" }}>
                   Notify FDA
                </ColorButton>
                <ColorButton variant="contained" size = 'large'>
                    Send FDA Results
                </ColorButton>
            </Box>

            <Header title="ADMINISTRATION" subtitle="Welcome to your dashboard"/>
            <Box m={{ xs: '20px 0 0 0', md: '30px 0 0 0' }} height="75vh"

              
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
                  <DataGrid rows={patientList.filter(patient => !patient.icdHealthCodes || patient.icdHealthCodes.length === 0)} columns={columns} />
                )}

                 
                
            </Box>
        </Box>
    )

}

export default Patient;