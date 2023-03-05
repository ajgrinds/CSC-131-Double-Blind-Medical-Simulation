import React from 'react'
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const Send = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <div>Patient</div>
    )
}

export default Send;