import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
//import ProgressCircle from "./ProgressCircle";

const StatBox = ({title, subtitle, icon, progress, increase}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    
    return(

        <Box width="50%" m="0 30px">
            <Box justifyContent="center">    
                <Box justifyContent="center" alignItems="center">
                    Hello
                </Box>
                <Box>
                    Hello
                </Box>
                <Box>Hello</Box>
                


            </Box>
        </Box>

    );
};

export default StatBox;