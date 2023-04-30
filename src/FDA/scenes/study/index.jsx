import React, { useState, useEffect } from "react";
import { Box, Grid, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import useFDA from "../../../vendiaHooks/useFDA";
import "./index.css";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";


/*Fetching data*/
const FDAStudy = () => {
  const { entities } = useFDA();
  const [studyList, setStudyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await entities.study.list();
        console.log(response);
        setStudyList(
          response.items.map((study, index) => ({
            id: index + 1,
            originalId: study._id, 
            ...study,
          }))
        );
  
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchData();
  }, [entities.study]);
  

  /*Approve and disapprove studies*/
  const handleApprove = async (row) => {
    const updatedRows = studyList.map((study) => {
      if (study.id === row.id) {
        return { ...study, status: "Approved", fdaApproved: true };
      }
      return study;
    });
    setStudyList(updatedRows);
  
    await entities.study.update({
      status: "Approved",
      fdaApproved: true,
      studyName: row.studyName,
      startDate: row.startDate,
      endDate: row.endDate,
      drugId: row.drugId,
      placeboId: row.placeboId,
      studyComplete: row.studyComplete,
      id: row.originalId,
    });
  };
  
  const handleDecline = async (row) => {
    const updatedRows = studyList.map((study) => {
      if (study.id === row.id) {
        return { ...study, status: "Declined", fdaApproved: false };
      }
      return study;
    });
    setStudyList(updatedRows);
  
    await entities.study.update({
      status: "Declined",
      fdaApproved: false,
      studyName: row.studyName,
      startDate: row.startDate,
      endDate: row.endDate,
      drugId: row.drugId,
      placeboId: row.placeboId,
      studyComplete: row.studyComplete,
      id: row.originalId,
    });
  };
   


  /*View Study button*/
  const handleOpenDialog = (study) => {
    setSelectedStudy(study);
  };

  const handleCloseDialog = () => {
    setSelectedStudy(null);
  };
  
  const columns = [
    {
      field: "viewStudy",
      headerName: "View Study",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog(cellValues.row)}
          >
            View Study
          </Button>
        );
      },
    },

    { field: "studyName", headerName: "Study Name", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: (params) => {
        if (params.value === "Approved") {
          return "approved";
        } else if (params.value === "Declined") {
          return "declined";
        } else if (params.value === "Pending") {
          return "pending";
        }
        return "";
      },
    },
    

    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },

    {
      field: "studyComplete",
      headerName: "Study Complete",
      flex: 1,
      renderCell: (cellValues) => {
        return cellValues.value ? (
          <CheckCircleIcon style={{ color: "green" }} />
        ) : (
          <CancelIcon style={{ color: "red" }} />
        );
      },
    },
    
    {
      field: "actions",
      headerName: "Approve / Decline",
      flex: 1,
      renderCell: (cellValues) => {
        if (cellValues.row.status === "Approved") {
          return (
            <Button variant="contained" color="primary" disabled>
              Approved
            </Button>
          );
        } else if (cellValues.row.status === "Declined") {
          return (
            <Button variant="contained" color="secondary" disabled>
              Declined
            </Button>
          );
        } else {
          return (
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleApprove(cellValues.row)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "red" }}
                onClick={() => handleDecline(cellValues.row)}
              >
                <CloseIcon />
              </Button>
            </div>
          );
        }
      },
    },
    
    
  ];
  
  
  return (
    <Container maxWidth="xl">
      <Header title="FDA STUDY" subtitle="Managing FDA Studies" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box m="30px 0 0 0" flexGrow={1} height="75vh">
            {isLoading ? (
              <Box>Loading...</Box>
            ) : (
              <DataGrid
                rows={studyList}
                columns={columns}
                rowHeight={50}
                headerHeight={50}
              />
            )}
          </Box>
        </Grid>
      </Grid>

      {/*View Study popup and its functionalities*/}
      {selectedStudy && (
        <Dialog open={Boolean(selectedStudy)} onClose={handleCloseDialog} maxWidth="md" fullWidth={true}>
          <DialogTitle>Study Details</DialogTitle>
          <DialogContent>
            <DialogContentText>ID: {selectedStudy.originalId}</DialogContentText>
            <DialogContentText>
              FDA Approval:{" "}
              {selectedStudy.status === "Approved" ? (
                <span style={{ color: "green" }}>Approved</span>
              ) : selectedStudy.status === "Declined" ? (
                <span style={{ color: "red" }}>Declined</span>
              ) : (
                <span style={{ color: "black" }}>Pending</span>
              )}
            </DialogContentText>

            <DialogContentText>Drug ID: {selectedStudy.drugId}</DialogContentText>
            <DialogContentText>Placebo ID: {selectedStudy.placeboId}</DialogContentText>

          </DialogContent>
          <DialogActions>
          <Button
                variant="contained"
                color="secondary"
                disabled={selectedStudy.status !== "Approved"}
                onClick={() => navigate("../../fda/patient")}
                style={{right:"62.5%", bottom:"5px" }}
              >
                Assign Drugs to Eligible Patients
              </Button>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

    </Container>
  );
};

export default FDAStudy;
