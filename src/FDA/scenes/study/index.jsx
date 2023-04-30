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
  const [selectedStudy, setSelectedStudy] = useState(null);
  const navigate = useNavigate();

  const [patientList, setPatientList] = useState([]);
  const [drugList, setDrugList] = useState([]);

  
   function assignDrugs() {
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
          
        }
      }

      fetchData();
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
  }

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
  


  /*View Study button*/
  
  const columns = [
    {
      field: "viewStudy",
      headerName: "View Study",
      flex: 1,
      renderCell: (cellValues) => {
        console.log(cellValues)
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
        if (cellValues.row.status === "assigned") {
          return <span style={{ color: "primary" }}>Drugs Assigned</span>;
        } else {
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
      },
    },
    
    
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

      {/*View Study popup and its functionalities*/}
      

    </Container>
  );
};

export default FDAStudy;
