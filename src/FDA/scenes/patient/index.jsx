import React, { useState, useEffect } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import useFDA from "../../../vendiaHooks/useFDA";

const FDAPatient = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const { entities } = useFDA();
  const [patientList, setPatientList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      field: "uuid",
      headerName: "UUID",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "header--cell",
      cellClassName: "uuid--cell",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "header--cell",
      cellClassName: "name--cell",
    },
  ];

  return (
    <Box m="20px">
        <Header title="FDA PATIENTS" subtitle="Managing FDA Patients"/>
        <Box m="30px 0 0 0" height="75vh"
            sx={{
                "& .MuiDataGrid-root":{
                    border: "none",
                },
                "& .MuiDataGrid-cell":{
                    borderBottom :"none",
                },
                "& .name-column--cell":{
                    color: colors.greenAccent[500],
                },
                "& .MuiDataGrid-columnHeaders":{
                    backgroundColor: colors.patientColor[200],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller":{
                    backgroundColor: colors.patientColor[100],
                },
                "& .MuiDataGrid-footerContainer":{
                    borderTop: "none",
                    backgroundColor: colors.patientColor[200],
                }
            }}
        >
        {isLoading ? (
                  <Box>Loading...</Box>
              ) : (
                  <DataGrid rows={patientList} columns={columns} 
                    className="custom-data-grid"
                    disableColumnMenu
                    disableSelectionOnClick
                    checkboxSelection
                    rowHeight={50}
                    headerHeight={50}
                  />
              )}
      </Box>
    </Box>
  );
};

export default FDAPatient;
