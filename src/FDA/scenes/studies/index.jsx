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
import { useStudies } from './StudiesData';
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

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
    fontSize: '1.0rem',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: '1.0rem',
  },
}));

const rows = [];

export default function ConditionalValidationGrid() {

  /* */
  const [notApprovedDialogOpen, setNotApprovedDialogOpen] = useState(false);
  const handleNotApprovedDialogOpen = () => {
    setNotApprovedDialogOpen(true);
  };
  
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const { studies: gridRows, setStudies: setGridRows } = useStudies();
  const storedRows = JSON.parse(localStorage.getItem("studies")) || [];

  /*Button Actions*/
  
  /*Approve Study button*/
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

  /*Decline Study button*/
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

  /*Delete Study button*/
  const handleDeleteClick = (event, rowId) => {
    event.stopPropagation();
  
    const rowIndex = gridRows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      const updatedRows = gridRows.filter((row) => row.id !== rowId);
      setGridRows(updatedRows);
      setUpdateStorage(true);
    }
  };

  /*View button for sending result button*/
  const [viewStudyOpen, setViewStudyOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const handleViewStudyClick = (event, study) => {
    setSelectedStudy(study);
    setViewStudyOpen(true);
  };
  const handleViewStudyCancel = () => {
    setViewStudyOpen(false);
  };
  const handleViewStudySend = () => {

  };

  /*Store data*/
  const [updateStorage, setUpdateStorage] = React.useState(false);

  React.useEffect(() => {
    if (gridRows.length === 0 && storedRows.length > 0) {
      setGridRows(storedRows);
    }
  
    if (updateStorage) {
      localStorage.setItem("studies", JSON.stringify(gridRows));
      setUpdateStorage(false);
    }
  
    return () => {
      localStorage.setItem("studies", JSON.stringify(gridRows));
    };
  }, [gridRows, storedRows, updateStorage]);

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

  const handleSendButtonClick = () => {
    if (!selectedStudy) {
      return;
    }
  
    if (selectedStudy.status === 'Declined') {
      setDialogOpen('declined');
    } else if (selectedStudy.status === 'Approved') {
      setDialogOpen('approved');
    } else {
      setDialogOpen('pending');
    }
  };

  
  const columns = [
    {
      field: 'study',
      headerName: 'Study',
      width: isSmallScreen ? 100 : 160,
      editable: false,
    },
    {
      field: 'startAt',
      headerName: 'Start Date',
      type: 'date',
      width: isSmallScreen ? 100 : 120,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: 'endsAt',
      headerName: 'End Date',
      type: 'date',
      width: isSmallScreen ? 100 : 120,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
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
      editable: false,
      preProcessEditCellProps: (params) => {
        const activeProps = params.otherFieldsProps.active;
        const hasError = activeProps.value && !params.props.value;
        return { ...params.props, error: hasError };
      },
    },
    /*Approve/decline study button and column*/
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
    /*Details/View Study column*/
    {
      field: 'details',
      headerName: 'Details',
      width: isSmallScreen ? 100 : 120,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#3f51b5',
              '&:hover': {
                backgroundColor: '#303f9f',
              },
            }}
            onClick={(event) => handleViewStudyClick(event, cellValues.row)}
          >
            View Study
          </Button>
        );
      },
    },
    /*Delete study button and column*/
    {
      field: 'action',
      headerName: 'Delete',
      width: isSmallScreen ? 100 : 120,
      renderCell: (cellValues) => {
        return (
          <IconButton
            sx={{ color: "grey" }}
            onClick={(event) => handleDeleteClick(event, cellValues.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    }
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

      <Dialog open={viewStudyOpen} onClose={handleViewStudyCancel} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" gutterBottom>
            Study name: {selectedStudy && selectedStudy.study}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Status:{" "}
            <span
              style={{
                color:
                  selectedStudy && selectedStudy.active === "Complete"
                    ? "green"
                    : selectedStudy && selectedStudy.active === "Rejected"
                    ? "red"
                    : undefined,
              }}
            >
              {selectedStudy &&
                (selectedStudy.active === "Complete"
                  ? "Study was approved"
                  : selectedStudy.active === "Rejected"
                  ? "Study was not approved"
                  : "Waiting for study approval...")}
            </span>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography paragraph>
          This Study status will be changed to Completed, and as such! a Report will be generated and shared with both Bavaria and Hopkins!
          </Typography>

            {/* Add more details here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewStudyCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleViewStudySend} color="primary">
            Send
          </Button>
          <Button
            onClick={() => {
              handleViewStudyCancel();
              navigate("./scenes/AssignDrugs");
            }}
            color="primary"
          >
            Assign drugs to eligible patients
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog */}
      {/* ... Dialog components */}
    </>
  );
}
