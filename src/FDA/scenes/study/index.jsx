import React, { useState, useEffect } from "react";
import { Box, Link, Grid, Container, Button, useTheme } from "@mui/material";
import { styled } from '@mui/system';
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import useFDA from "../../../vendiaHooks/useFDA";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import avatar from "../../pictures/fdaLogo.jpeg"
import { useMediaQuery } from '@mui/material';


import "./index.css";

const ViewStudyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#4CAF50' : '#2196F3',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? '#388E3C' : '#1565C0',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const DataGridContainer = styled(Box)(({ theme }) => ({
  boxShadow: 3,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 2,
}));

const FDAStudy = () => {
  const { entities } = useFDA();
  const [studyList, setStudyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));


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
        setAllPatients(await entities.patient.list())
        console.log(allPatients)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchData();
  }, [entities.study, reload]);

  const fetchData = async () => {
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


  const statuses = ["Cancelled", "Complete", "Created", "Approved", "Full", "In Progress", "Awaiting Results"];
  
  const statusComparator = (v1, v2) =>
  statuses.indexOf(v1) - statuses.indexOf(v2);
    
  const columns = [
    {
      field: "viewStudy",
      headerName: "View Study",
      minWidth: 100, 
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <ViewStudyButton
            variant="contained"
            href={`/fda/details/${cellValues.row._id}`}
          >
            View Study
          </ViewStudyButton>
        );
      },
    },

    { field: "studyName", headerName: "Study Name", minWidth: 100, flex: matches ? 1 : 1.5 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: matches ? 1 : 1.5,
      sortComparator: statusComparator,
    },
    { 
      field: "participants",
      headerName: "Particiapnts",
      minWidth: 100,
      flex: matches ? 1 : 1.5,
      renderCell: (cellValues) => {
        return <span>{allPatients.items.filter((item) => item.study == cellValues.row.studyName).length}</span>;
      }
    },
    { field: "startDate", headerName: "Start Date", minWidth: 100, flex: matches ? 1 : 1.5 },
    { field: "endDate", headerName: "End Date", minWidth: 100, flex: matches ? 1 : 1.5 },
    {
      field: "studyComplete",
      headerName: "Study Complete",
      minWidth: 140,
      flex: matches ? 1 : 1.5,
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
      minWidth: 140,
      flex: matches ? 1 : 1.5,
      renderCell: (cellValues) => {
        if (cellValues.row.status === "Created") {
          return (
            <div style={{ display: "flex", gap: "10px" }}>
              <ActionButton
                variant="contained"
                onClick={() => handleApprove(cellValues.row)}
              >
                Approve
              </ActionButton>
              <ActionButton
                variant="contained"
                onClick={() => handleDecline(cellValues.row)}
              >
                Deny
              </ActionButton>
            </div>
          )
        }
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
    <Container maxWidth="xl" sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <img className="avatar-image" alt="profile-user" width="210px" height="100px" src={avatar}
      style={{cursor: "pointer", borderRadius: "0%", marginTop: "-50px"}}/>
       <Grid container spacing={3}>
       <Grid item xs={12}>
          <DataGridContainer m="50px 0 0 0" flexGrow={1}>
          <Header subtitle="Managing FDA Studies" />
            {isLoading ? (
              <Box>Loading...</Box>
            ) : (
              <DataGrid
                rows={studyList}
                columns={columns}
                rowHeight={50}
                headerHeight={50}
                autoHeight
                initialState={{
                sorting: {
                  sortModel: [{ field: 'status', sort: 'asc' }],
                },
              }}
              />
            )}
          </DataGridContainer>
        </Grid>
      </Grid>
    </Container>
  );
};
export default FDAStudy;
