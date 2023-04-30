import React, { useState, useEffect } from 'react';
import {
  Box,
  Icon,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import useFDA from "../../../vendiaHooks/useFDA";
import { Grid, Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";



const FDAPatient = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCompleted, setIsCompleted] = useState(false);

  const { entities } = useFDA();
  const [patientList, setPatientList] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);

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

  function assignDrugs() {
    console.log(drugList)
    for (var i=0; i < patientList.length; i++) {
      if (patientList[i].eligible ) {
        // Retrieving an item, changing a field, and saving the updated item
        const drug_id = Math.floor(Math.random() * 100000000000000000).toString();
        var found = false;
        for (var j=0; j < drugList.length; j++) {
          if (drugList[j].drug == null) {
            const updateDrugResponse = entities.drug.update({
            _id: drugList[j]._id,
            id: drug_id,
            });
            drugList[j].drug = drug_id;
            found = true;
            break;
          }
        }
        if (!found) 
        {
          console.log("No drugs to assign")
          break;
        }
        const updatePatientResponse = entities.patient.update({
            _id: patientList[i]._id,
            drug: drug_id,
            });
        console.log(updatePatientResponse)
      }
    } 
    setIsCompleted(!isCompleted);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await entities.patient.list();
        console.log(response);
        setPatientList(
          response.items.map((patient, index) => ({
            id: index + 1,
            _id: patient._id,
            uuid: patient.uuid,
            eligible: patient.icdHealthCodes == null,
            drug: patient.drug
          }))
        );
        const drug_response = await entities.drug.list();
        console.log("Drug list");
        console.log(drug_response);
        setDrugList(
          drug_response.items.map((drug, index) => ({
            id: index + 1,
            _id: drug._id,
            placebo: drug.placebo,
            batchNumber: drug.batchNumber,
            drug: drug.id
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [entities.patient, isCompleted]);

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

  return (
    <Container maxWidth="lg">
      <Header title="FDA PATIENTS" subtitle="Managing FDA Patients" />
      <Button
              onClick={() => assignDrugs()}
              variant="contained"
            >
              <Typography variant="h6">Assign Drugs</Typography>
        </Button>   
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            m="30px 0 0 0"
            flexGrow={1}
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[500],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.patientColor[200],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.patientColor[100],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.patientColor[200],
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

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete ID"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this patient?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FDAPatient;
