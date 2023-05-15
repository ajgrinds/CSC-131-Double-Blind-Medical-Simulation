import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, useTheme, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import useJaneHopkins from "../../../vendiaHooks/useJaneHopkins";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import StudyContent from '../studyContent';


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
    
    const [studyList, setStudyList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   
    

   
    useEffect (() => {

        async function fetchStudy() {

            try{


                setIsLoading(true);
                const response = await entities.study.list();
                console.log(response);
                setStudyList(response.items.map((study, index) => ({
                    ...study, 
                    id: index + 1
                })));

            }catch(error){
                console.log(error);
            } finally{
                setIsLoading(false);
            }

        }

        fetchStudy();

    }, [entities.study]);

   
    const columns = [

        {   
            field: "studyName", 
            headerName: "Study Name",
            flex:1,           
        }, 
       

        {
            field: "startDate",
            headerName: "Start Date",
            flex : 1,
        },
        
        {
            field: "endDate",
            headerName: "End Date",
            flex : 1,
        }, 

       
    {
        field: "",
        headerName: "Study Details",
        width: 150,
        renderCell: (params) => (
            
            <Link style={{textDecoration: "none"}} to={`/JaneHopkins/studyContent/${params.row.studyName}`}>
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

            

               

            <Header title="ADMINISTRATION" subtitle="Welcome to your dashboard"/>       

            {studyList.length >= 0 ? (
                <Box
                    m={{ xs: '20px 0 0 0', md: '30px 0 0 0' }} 
                    height="75vh"
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
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="100vh"
                      >
                        <CircularProgress/>
                      </Box>
                    ) : (
                        <DataGrid rows={studyList} columns={columns} />
                    )}



                </Box>

            ) : (

                <Box display="flex" justifyContent="center" alignItems="center">
                    No Studies...
                </Box>
                
            )}

          

            
           
        </Box>
    )

}

export default Patient;