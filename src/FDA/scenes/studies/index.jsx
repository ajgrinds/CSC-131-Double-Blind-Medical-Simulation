import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";

const StyledBox = styled(Box)(({ theme }) => ({
  height: 300,
  width: '100%',
  '& .MuiDataGrid-columnHeaderWrapper': {
    backgroundColor: theme.palette.primary.main,
    color: '#1a3e72',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: theme.palette.error.main,
  },
}));

const rows = [
  {
    id: 1,
    study: 'New Study',
    startAt: new Date(2021, 6, 8),
    endsAt: new Date(2021, 6, 8),
    active: "Pending",
    fdaApr: 'No',
    bavariaApr: 'No'
  },
  {
    id: 2,
    study: 'Covid',
    startAt: new Date(2021, 6, 8),
    endsAt: new Date(2021, 7, 1),
    active: "Pending",
    fdaApr: 'No',
    bavariaApr: 'No'
  },
  {
    id: 3,
    study: 'flu',
    startAt: new Date(2021, 6, 8),
    endsAt: new Date(2021, 7, 4),
    active: "Pending",
    fdaApr: 'Yes',
    bavariaApr: 'Yes'
  },
];

export default function ConditionalValidationGrid() {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const [gridRows, setGridRows] = React.useState(rows);

  const handleApproveClick = (event, cellValues, rowId) => {
    event.stopPropagation();
  
    const rowIndex = gridRows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      const updatedRows = [...gridRows];
      updatedRows[rowIndex].active = 'Complete';
      setGridRows(updatedRows);
    }
  };
  const handleDeclineClick = (event, cellValues, rowId) => {
    event.stopPropagation();
  
    const rowIndex = gridRows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      const updatedRows = [...gridRows];
      updatedRows[rowIndex].active = 'Rejected';
      setGridRows(updatedRows);
    }
  };
  const handleDeleteClick = (event, rowId) => {
    event.stopPropagation();
  
    const rowIndex = gridRows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      const updatedRows = gridRows.filter((row) => row.id !== rowId);
      setGridRows(updatedRows);
    }
  };
  

  const columns = [
    {
      field: 'study',
      headerName: 'Study',
      width: isSmallScreen ? 100 : 160,
      editable: true,
    },
    {
      field: 'startAt',
      headerName: 'Start Date',
      type: 'date',
      width: isSmallScreen ? 100 : 120,
      editable: true,
    },
    {
      field: 'endsAt',
      headerName: 'End Date',
      type: 'date',
      width: isSmallScreen ? 100 : 120,
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Active',
      width: isSmallScreen ? 100 : 140,
      editable: false,
      valueFormatter: (params) => params.value,
    },
    {
      field: 'bavariaApr',
      headerName: 'Bavaria Approval',
      type: 'singleSelect',
      valueOptions: ['No', 'Yes', 'Pending'],
      width: isSmallScreen ? 100 : 160,
      editable: true,
      preProcessEditCellProps: (params) => {
        const activeProps = params.otherFieldsProps.active;
        const hasError = activeProps.value && !params.props.value;
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "Approve Study",
      width: isSmallScreen ? 120 : 150,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3f51b5",
              "&:hover": {
                backgroundColor: "#303f9f",
              },
            }}
            onClick={(event) => {
              handleApproveClick(event, cellValues, cellValues.row.id);
            }}
          >
            Approve
          </Button>
        );
      }
    },
    {
      field: "Decline Study",
      width: isSmallScreen ? 120 : 150,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#DA3333",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
            onClick={(event) => {
              handleDeclineClick(event, cellValues, cellValues.row.id);
            }}
          >
            Decline
          </Button>
        );
      }
    },
    {
      field: "Delete Study",
      width: isSmallScreen ? 120 : 150,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1E2D51",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
            onClick={(event) => {
              handleDeleteClick(event, cellValues.row.id);
            }}
          >
            Delete
          </Button>
        );
      }
    },
  ];

  return (
    <StyledBox>
      <DataGrid rows={gridRows} columns={columns} editMode="row" />
    </StyledBox>
  );
}
