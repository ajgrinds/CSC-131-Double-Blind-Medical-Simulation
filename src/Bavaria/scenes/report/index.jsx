import React from 'react'
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const Report = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <div>Patient</div>
    )
}

export default Report;