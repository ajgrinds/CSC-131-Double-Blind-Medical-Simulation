import React from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import VaccinesIcon from '@mui/icons-material/Vaccines';

const Send = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
        display="flex"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        justifyContent="center"
        >
            <Box 
                gridColumn="span 10" 
                backgroundColor={colors.primary[400]} 
                display="flex" 
                alignItems="center"
                justifyContent="center"
                borderRadius={5}
            >
                <VaccinesIcon sx={{color: colors.blueAccent[500]}}/>
                <Typography variant='h5' p={1}>
                Send Batch
                </Typography>
            
            </Box>
        </Box>
    )
}

export default Send;