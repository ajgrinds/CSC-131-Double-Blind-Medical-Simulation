import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import useFDA from "../../../vendiaHooks/useFDA";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const FDAPatient = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { entities } = useFDA();
  const [patientList, setPatientList] = useState([]);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await entities.patient.list();
        console.log(response);
        setPatientList(
          response.items.map((patient, index) => ({
            id: index + 1,
            uuid: patient.uuid,
            name: patient.name,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [entities.patient]);

  const columns = [
    {
      field: "delete",
      headerName: "Remove ID",
      width: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "header--cell",
      renderCell: (params) => (
        <IconButton
          edge="end"
          color="error"
          onClick={() => handleOpenDeleteDialog(params.row.id)}
        >
          <CloseIcon />
        </IconButton>
      ),
    },
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
      field: "drugs",
      headerName: "Drugs",
      flex: isSmallScreen ? 0.5 : 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "header--cell",
      renderCell: () => (
        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="primary" size="small">
            Drug
          </Button>
          <Button variant="contained" color="secondary" size="small">
            Placebo
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Header title="FDA PATIENTS" subtitle="Managing FDA Patients" />
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
