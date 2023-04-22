import React from "react" 
import'./Assign.css'
import { tokens } from "../../theme";
import {Box, Typography, useTheme} from "@mui/material";

function Assign(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (props.trigger) ? (
        <div className="assign">
            <div className="assign-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>

                { props.children }
            </div>
        </div>
    ) : "";
}

export default Assign