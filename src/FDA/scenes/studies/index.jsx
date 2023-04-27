import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';


const StyledBox = styled(Box)(({ theme }) => ({
  height: 500,
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
  '& .MuiDataGrid-cell': {
    fontSize: '1.1rem',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: '1.1rem',
  },
}));

const rows = [];

export default function ConditionalValidationGrid() {
  
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const [gridRows, setGridRows] = React.useState(rows);

  const handleApproveClick = (event, cellValues, rowId) => {
    event.stopPropagation();
  
    const rowIndex = gridRows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      const updatedRows = [...gridRows];
      updatedRows[rowIndex].active = "Complete";
      updatedRows[rowIndex].actionResult = "Approved successfully";
      setGridRows(updatedRows);
    }
  };
  const handleDeclineClick = (event, cellValues, rowId) => {
    event.stopPropagation();
  
    const rowIndex = gridRows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      const updatedRows = [...gridRows];
      updatedRows[rowIndex].active = "Rejected";
      updatedRows[rowIndex].actionResult = "Study was declined";
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

  // Create Study
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newStudyData, setNewStudyData] = React.useState({
    study: '',
    startAt: '',
    endsAt: '',
  });

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setNewStudyData({
      study: '',
      startAt: '',
      endsAt: '',
    });
    setDialogOpen(true);
  };

    const handleDialogSubmit = () => {
    const newRow = {
      id: gridRows.length + 1,
      study: newStudyData.study,
      startAt: new Date(newStudyData.startAt),
      endsAt: new Date(newStudyData.endsAt),
      active: 'Pending',
      fdaApr: 'No',
      bavariaApr: 'No',
    };

    setGridRows([...gridRows, newRow]);
    setDialogOpen(false);
  };

  const pendingCount = gridRows.filter(row => row.active === "Pending").length;
  const approvedCount = gridRows.filter(row => row.active === "Complete").length;
  const declinedCount = gridRows.filter(row => row.active === "Rejected").length;

  
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
    },
    {
      field: 'endsAt',
      headerName: 'End Date',
      type: 'date',
      width: isSmallScreen ? 100 : 120,
    },
    {
      field: 'active',
      headerName: 'Status',
      width: isSmallScreen ? 100 : 140,
      editable: false,
      valueFormatter: (params) => params.value,
    },
    {
      field: 'bavariaApr',
      headerName: 'Bavaria Approval',
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
    width: isSmallScreen ? 240 : 300, 
    renderCell: (cellValues) => {
      const { actionResult } = cellValues.row;

      return actionResult ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: actionResult === "Approved successfully" ? "#4caf50" : "#f44336",
            borderRadius: 1,
            padding: 1,
            width: "100%",
          }}
        >
          <Typography variant="body1">{actionResult}</Typography>
        </Box>
      ) : (
        <>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3f51b5",
              "&:hover": {
                backgroundColor: "#303f9f",
              },
              marginRight: 1,
            }}
            onClick={(event) => {
              handleApproveClick(event, cellValues, cellValues.row.id);
            }}
          >
            Approve
          </Button>
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
        </>
      );
    },
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
    <>
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
  <DialogTitle>Create Study</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      id="study"
      label="Study"
      type="text"
      fullWidth
      value={newStudyData.study}
      onChange={(event) =>
        setNewStudyData({ ...newStudyData, study: event.target.value })
      }
    />
    <TextField
  margin="dense"
  id="startAt"
  label="Start Date"
  type="date"
  fullWidth
  InputLabelProps={{
    shrink: true,
  }}
  InputProps={{
    inputProps: {
      min: '1900-01-01',
      max: '2099-12-31',
      pattern: '\\d{2}/\\d{2}/\\d{4}',
    },
  }}
  value={newStudyData.startAt}
  onChange={(e) =>
    setNewStudyData({ ...newStudyData, startAt: e.target.value })
  }
/>
<TextField
  margin="dense"
  id="endsAt"
  label="End Date"
  type="date"
  fullWidth
  InputLabelProps={{
    shrink: true,
  }}
  InputProps={{
    inputProps: {
      min: '1900-01-01',
      max: '2099-12-31',
      pattern: '\\d{2}/\\d{2}/\\d{4}',
    },
  }}
  value={newStudyData.endsAt}
  onChange={(e) =>
    setNewStudyData({ ...newStudyData, endsAt: e.target.value })
  }
/>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose}>Cancel</Button>
    <Button onClick={handleDialogSubmit}>Create</Button>
  </DialogActions>
</Dialog>
      <Box
        display="flex"
        justifyContent="space-around"
        marginBottom={2}
        sx={{
          "& > div": {
            padding: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        {/* Status boxes */}
        <Box
          sx={{
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 1,
            height: "150px",
            width: "100%",
          }}
        >
          <Typography variant="h6">Pending: {pendingCount}</Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 1,
            height: "150px",
            width: "100%",
          }}
        >
          <Typography variant="h6">Approved: {approvedCount}</Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 1,
            height: "150px",
            width: "100%",
          }}
        >
          <Typography variant="h6">Declined: {declinedCount}</Typography>
        </Box>
      </Box>

      {/* Create Study Button */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
          Create Study
        </Button>
      </Box>

      {/* DataGrid */}
      <StyledBox>
        <DataGrid
          rows={gridRows}
          columns={columns}
          editMode="row"
          rowHeight={80}
          localeText={{
            noRowsLabel: 'No Studies',
          }}
        />
      </StyledBox>

      {/* Dialog */}
      {/* ... Dialog components */}
    </>
  );
}
