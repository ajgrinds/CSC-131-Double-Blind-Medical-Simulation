import React from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MyProSidebarProvider, SidebarContext } from './scenes/sidebar/sideBarContext';
import TopBar from './components/TopBar';
import Dashboard from './scenes/dashboard';
import Patient from './scenes/patient';
import PatientDetails from './scenes/patientdetails';
import AddPatient from './scenes/addpatient';
import MyProSideBar from './scenes/sidebar/MyProSideBar';
import Admin from './scenes/admin';
import SmoothTransition from './scenes/smooth.js';
import TrackDosage from './scenes/trackDosage';
import StudyContent from './scenes/studyContent';
import PatientDosage from './scenes/patientDosage';

const Doctor = () => {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: '100%', width: '100%' }}>
            <TopBar />
            <main>
              <SmoothTransition location={location}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/patient" element={<Patient />} />
                  <Route path="/addpatient" element={<AddPatient />} />
                  <Route path="/patient/:id" element={<PatientDetails />} />
                  <Route path="/trackdosage" element={<TrackDosage/>} />
                  <Route path="/trackdosage/:id" element={<PatientDosage/>}/>
                  <Route path="/studycontent/:name" element={<StudyContent/>}/>
                  
                </Routes>
              </SmoothTransition>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Doctor;
