import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import useFDA from "../../../vendiaHooks/useFDA";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FDADetails = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { studyID } = useParams();
  const { entities } = useFDA();

  const [isLoading, setIsLoading] = useState(false);

  const [study, setStudy] = useState(null);
  const [id, setID] = useState(null);
  const [name, setName] = useState(null);
  const [, setStatus] = useState(null);
  const [setStartDate] = useState(null);
  const [setEndDate] = useState(null);
  const [drugID, setDrugID] = useState(null);
  const [placeboID, setPlaceboID] = useState(null);

  const [patientList, setPatientList] = useState([]);
  const [] = useState([]);

  const [, setOpenDeleteDialog] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setPatientList((prevPatientList) => prevPatientList.filter((patient) => patient.id !== id));
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteRowId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteClick(deleteRowId);
    handleCloseDeleteDialog();
  };

  const navigateToStudy = () => {
    navigate("/fda");
  };


  useEffect(() => {
    async function getPatients(study) {
      try {
        const response = await entities.patient.list({
            filter: {
                study: {
                  eq: study,
                }
          }

        });
        console.log(response)
        setPatientList(
          response.items.map((patient, index) => ({
            id: index + 1,
            _id: patient._id,
            uuid: patient.uuid,
            eligible: patient.icdHealthCodes == null,
            drug: patient.drug
          }))
        );
      } catch (error) {
        console.log(error);
    }
  }

    async function fetchData() {
      try {
          const response = await entities.study.get(studyID);
          setStudy(response);

          setIsLoading(true);

          // set the values of each entity to the current value of the patients
          setID(response._id);
          setName(response.studyName);
          setStatus(response.status);
          setStartDate(response.startDate);
          setEndDate(response.endDate);
          setDrugID(response.drugId);
          setPlaceboID(response.placeboId);

          getPatients(response.studyName);
      }
      catch(error){
          console.log(error);
      }
      finally{
          setIsLoading(false);
      }
  }
  fetchData();
}, [entities.patient, studyID]);

  const columns = [
    {
      field: "uuid",
      headerName: "UUID",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "header--cell",
      cellClassName: "uuid--cell",
    },
    {
      field: "eligible",
      headerName: "Eligibility",
      width: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "header--cell",
      cellClassName: "eligibility--cell",
      renderCell: (params) => (
        <>
          {params.row.eligible ? (
             <>
          <CheckIcon
            edge="end"
            color="success"
          >
          </CheckIcon>
        </>
          ) : (
             <>
          <CloseIcon
            edge="end"
            color="error"
          >
          </CloseIcon>
        </>
          )}
        </>
      ),
    },
    {
      field: "drug",
      headerName: "Drug ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "header--cell",
      cellClassName: "drug-id--cell",
    },
  ];

  return ( study ? (
    <Container maxWidth="lg">
      <Box mt={-1} mb={1}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Box bgcolor={theme.palette.mode === 'dark' ? '#171B21' : 'grey.10'} p={3} borderRadius={2}>
            <Typography variant="h2" style={{marginTop: "-90px", color: theme.palette.mode === "dark" ? "#FFD700" :  "#000000"}}>
                {name}
              </Typography>
              <Typography variant="subtitle1">
                Study ID: {id}
              </Typography>
              <Typography variant="subtitle1">
                Drug ID: {drugID}
              </Typography>
              <Typography variant="subtitle1">
                Placebo ID: {placeboID}
              </Typography>
            </Box>
            <Button 
            variant="contained"
            color="primary"
            onClick={navigateToStudy}
            startIcon={<ArrowBackIcon />}
            style={{ marginBottom: '-40px'}}
        >
            Back to FDA
        </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            m="30px 0 0 0"
            flexGrow={1}
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                color: theme.palette.mode === "dark" ? "white" : "black",
                backgroundColor: theme.palette.mode === "dark" ? "grey.800" : "white",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid grey",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.mode === "dark" ? "grey.800" : "white",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
              },
            }}
          >
            {isLoading ? (
              <Box>Loading...</Box>
            ) : (
              <DataGrid
                rows={patientList}
                columns={columns}
                className="custom-data-grid"
                rowHeight={50}
                headerHeight={50}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'eligible', sort: 'desc' }],
                  },
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>  
  ) : (
        <p>Loading...</p> 
      ));
};

export default FDADetails;
