import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route} from "react-router-dom";

import { MyProSidebarProvider } from "./scenes/sidebar/MyProSideBar";
import TopBar from "./scenes/topbar";

import FDADashboard from "./scenes/dashboard";

import FDAPatient from "./scenes/patient";


function FDA() {

  const [theme, colorMode] = useMode();

  return ( 
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <MyProSidebarProvider>

        <div style={{height: "100%", width: "100%"}}>
          <TopBar/>
          <main>
            <Routes>
              <Route path="/" element={<FDADashboard/>}/>
              <Route path="/patient" element={<FDAPatient/>} />
              
            </Routes>

          </main>

        </div>
      </MyProSidebarProvider>
    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default FDA;
