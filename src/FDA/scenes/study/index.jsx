import React, { useState, useEffect } from "react";
import { Box, Link, Grid, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
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
  const [reload, setReload] = useState(true);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const navigate = useNavigate();

  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await entities.study.list();
        setStudyList(
          response.items.map((study, index) => ({
            id: index + 1,
            _id: study._id, 
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
  }, [entities.study, reload]);
  


  const handleApprove = async (row) => {
    // Update the fetched data
    await entities.study.update({_id: studyList[row.id - 1]._id, status: 'Approved'});
    setReload(!reload);
  };

  const handleDecline = async (row) => {
    // Update the fetched data
    await entities.study.update({_id: studyList[row.id - 1]._id, status: 'Cancelled'});
    setReload(!reload);
  };

  const complete = async (row) => {
    // Update the fetched data
    await entities.study.update({_id: studyList[row.id - 1]._id, status: 'Complete'});
    setReload(!reload);
  };
    
  const assignDrugs = async (row) => {
    const response = await entities.patient.list({
        filter: {
            study: {
              eq: studyList[row.id - 1]._id,
            }
      }
    });
    setPatientList(
      response.items.map((patient, index) => ({
        id: index + 1,
        _id: patient._id,
        eligible: patient.icdHealthCodes == null,
        drug: patient.drug
      }))
    );
    for (var i=0; i < patientList.length; i++) {
      if (patientList[i].eligible ) {
        // Retrieving an item, changing a field, and saving the updated item
        const drug_id = Math.floor(Math.random() * 2).toString();
        const updatePatientResponse = entities.patient.update({
          _id: patientList[i]._id,
          drug: drug_id == 1 ? "placebo" : "real",
        });
      }
    }

    // Update the fetched data
    await entities.study.update({_id: studyList[row.id - 1]._id, status: 'In Progress'});
    setReload(!reload);
  }   

  
  const columns = [
    {
      field: "viewStudy",
      headerName: "View Study",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Button
              variant="contained" 
              style={{ backgroundColor: "primary"}} 
              href={`/fda/details/${cellValues.row._id}`}
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
            return  <span style={{ color: "green" }}>Approved</span>;
          } else if (params.value === "Declined") {
            return  <span style={{ color: "red" }}>Declined</span>;
          } else if (params.value === "Pending") {
            return  <span style={{ color: "primary" }}>Pending</span>;
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
          return cellValues.row.status == "Complete" ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <CancelIcon style={{ color: "red" }} />
          );
        },
      }, 
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        renderCell: (cellValues) => {
          if (cellValues.row.status === "Created") {
            return (<div style={{ display: "flex", gap: "10px" }}>
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
                  Deny
                </Button>
           </div>
           )}
          else if (cellValues.row.status === "Approved")
          {
            return (
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => assignDrugs(cellValues.row)}
                >
                  <span style={{ color: "red" }}>Start Immediately</span>
                </Button>
              </div>)
          }
          else if (cellValues.row.status === "Cancelled") {
            return <span style={{ color: "red" }}>Cancelled</span>
          }
          else if (cellValues.row.status === "Full") {
            return (
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => assignDrugs(cellValues.row)}
                >
                  Assign Drugs
                </Button>
              </div>
            );
          }
          else if (cellValues.row.status === "In Progress")
          {
            return <span style={{ color: "primary" }}>In Progress</span>
          }
          else if (cellValues.row.status === "Awaiting Results")
          {
            return (<div style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => complete(cellValues.row)}
                >
                  Release Results
                </Button>
              </div>)
          }
          else if (cellValues.row.status === "Complete")
          {
            return <span style={{ color: "green" }}>Complete</span>
          }
          else
          {
            return <span style={{ color: "red" }}>INVALID STATUS</span>
          }
        },
    }
  ];
  
  
  return (
    <Container maxWidth="xl">
      <Header subtitle="Managing FDA Studies" />
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
    </Container>
  );
};

export default FDAStudy;
