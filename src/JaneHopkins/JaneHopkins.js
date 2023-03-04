import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route} from "react-router-dom";
import TopBar from "../TopBar";
import Sidebar from "./scenes/sidebar";
import Dashboard from "./scenes/dashboard";
import Patient from "./scenes/patient";
import PatientDetails from "./scenes/patientdetails";


const Doctor = () => {

    const [theme, colorMode] = useMode();
    return (
        
    <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
            <Sidebar/>
            <main className="content">
            <TopBar/>

            <Routes>
                
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/patient" element={<Patient/>}/>
                <Route path="/patient/:id" element={<PatientDetails/>}/>
                     
            </Routes>
            </main>
        </div>

        </ThemeProvider>
    </ColorModeContext.Provider>



    )
}

export default Doctor