import React from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";


const Report = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
            <Box 
                gridColumn="span 10" 
                backgroundColor={colors.primary[400]} 
                display="flex" 
                alignItems="center"
                justifyContent="center"
                borderRadius={5}
            >
                <ReceiptOutlinedIcon sx={{color: colors.blueAccent[500]}}/>
                <Typography variant='h5' p={1}>
                Generate Report
                </Typography>
            
            </Box>
    )
}

export default Report;