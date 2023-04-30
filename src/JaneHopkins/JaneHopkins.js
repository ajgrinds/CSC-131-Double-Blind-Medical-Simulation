import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route, useLocation} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import { MyProSidebarProvider, SidebarContext } from "./scenes/sidebar/sideBarContext";

import TopBar from "./components/TopBar";

import Dashboard from "./scenes/dashboard";
import Patient from "./scenes/patient";
import PatientDetails from "./scenes/patientdetails";
import AddPatient from "./scenes/addpatient";
import MyProSideBar from "./scenes/sidebar/MyProSideBar";
import TrackDosage from "./scenes/trackDosage";
import PatientDosage from "./scenes/patientDosage";

import Admin from "./scenes/admin";
import "./scenes/smooth.css";
import StudyContent from "./scenes/studyContent";

const Doctor = () => {

    const [theme, colorMode] = useMode();
    const location = useLocation();

    return (
        
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <MyProSidebarProvider>
                    <div style={{height: "100%", width: "100%"}}>
                        <TopBar/>
                        <main>
                            

                            <Routes>
                            
                                <Route path="/" element={<Dashboard/>}/>
                                <Route path="/admin" element={<Admin/>}/>
                                <Route path="/patient" element={<Patient/>}/>
                                <Route path="/addpatient" element={<AddPatient/>} />
                                <Route path="/patient/:id" element={<PatientDetails/>}/>
                                <Route path="trackdosage" element={<TrackDosage/>}/>
                                <Route path="trackdosage/:id" element={<PatientDosage/>} />
                                <Route path="studycontent" element={<StudyContent/>} />
                                
                            </Routes>
                                    
                                
                        </main>
                    </div>

                </MyProSidebarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Doctor;
