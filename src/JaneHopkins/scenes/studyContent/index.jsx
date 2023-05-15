import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, useTheme, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import { useParams } from 'react-router-dom';
import useJaneHopkins from "../../../vendiaHooks/useJaneHopkins";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import { useParams } from 'react-router-dom';

const StudyContent = () => {


    const { id } = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { study } = useParams();

    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: colors.greenAccent[600],
      '&:hover': {
        backgroundColor: colors.greenAccent[500],
      },
    }));

    const {entities} = useJaneHopkins();
    const [patientList, setPatientList] = useState([]);
    const [studyList, setStudyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [complete, setComplete] = useState(false);
    

    useEffect(() => {

        async function fetchData() {

            try{

                const response = await entities.patient.list({
                    filter: {
                        study: {
                          eq: study,
                        }
                  }

                });
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


    useEffect (() => {

        async function fetchStudy() {

            try{
                setIsLoading(true);
                const response = await entities.study.list({
                    filter: {
                        studyName: {
                          eq: study,
                        }
                  }

                });
                setStudyList(response.items.map((study, index) => ({
                    ...study, 
                    id: index + 1
                })))

            }catch(error){
                console.log(error);
            }finally{
                setIsLoading(false);
            }

        }

        fetchStudy();

    }, [entities.study]);

    useEffect(() => {
        const checkComplete = () => {
          const isComplete = patientList.every(patient => patient.visits && patient.visits.length === 5);
          setComplete(isComplete);
        };
      
        checkComplete();
      }, [patientList]);
      

    

    const columns = [

        {   
            field: "uuid", 
            headerName: "UUID",
            flex:1,           
        }, 
        {   
            field: "name", 
            headerName: "Name",
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
                
                <CheckIcon/>
                     
            ),
        },
        
    ];

    const sendResults = async () => {
    // Send results
    await entities.study.update({_id: studyList[0]._id, status: 'Awaiting Results'});
  };


  return (
    <Box m="20px">
            <Header title="Study Content" subtitle="Patient List"/>   
            <Box position="flex" justifyContent="center" alignItems="center">
                <ColorButton variant="contained" size ='large' style={{ marginRight: "10px" }}>
                   Notify FDA
                </ColorButton>
           
                <ColorButton 
                    variant="contained"
                    size = 'large'
                    
                    color="primary" 
                    disabled={complete === false}
                    sx={{
                    borderColor: !complete ? "grey" : "",
                    color: !complete ? "grey" : "primary",
                    }}
                    onClick={() => sendResults()}
                >
                    Send FDA Results
                </ColorButton>


            </Box>   

                

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
                        <DataGrid rows={patientList.filter(patient => !patient.icdHealthCodes || patient.icdHealthCodes.length === 0 && patient.study === id )} columns={columns} />
                    )}



                </Box>

            ) : (

                <Box display="flex" justifyContent="center" alignItems="center">
                    {isLoading ? (
                        <Box>
                            <CircularProgress color={colors.greenAccent[400]}/>

                        </Box>
                        
                    ) : (
                    
                    
                        <Box>No Studies...</Box>
                    
                    )}
                </Box>
                
            )}

          

            
           
        </Box>
    )
  
}

export default StudyContent;