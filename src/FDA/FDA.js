import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route, Navigate} from "react-router-dom";
import TopBar from "./scenes/topbar";

import FDADashboard from "./scenes/dashboard";
import FDASidebar from "./scenes/sidebar";
import FDAPatient from "./scenes/patient";


function FDA() {

  const [theme, colorMode] = useMode();

  return ( 
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">

       <FDASidebar/>

        <main className="content">
          <TopBar/>
          
        
          {/*Add all the routes for FDA here. i.e patients, assign drugs, etc */}
          {/* only include the path name without /fda path preceding it such as... i.e ...  /patient  /assignDrug */}
          {/* In App.js you will put the full path name. i.e. /fda/patient/  /fda/assignDrug */}
          <Routes>
            <Route path="/" element={<FDADashboard/>}/>
            <Route path="/patient" element={<FDAPatient/>} />
            
          </Routes>

        </main>

      </div>

    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default FDA;
