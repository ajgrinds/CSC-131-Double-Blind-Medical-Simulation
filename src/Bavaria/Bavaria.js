import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route, Navigate} from "react-router-dom";

import TopBar from "./scenes/topbar";
import BavariaSidebar from "./scenes/sidebar";
import BavariaDashboard from "./scenes/dashboard";
import BavariaPatients from "./scenes/patients";
import Report from "./scenes/report";
import Send from "./scenes/send";

function Bavaria() {

  const [theme, colorMode] = useMode();

  return ( 
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">

       <BavariaSidebar/>

       <main className="content">
          <TopBar/>
          
        
         
          <Routes>
          <Route path="/" element={<BavariaDashboard/>}/>
          <Route path="/patients" element={<BavariaPatients/>} />
          <Route path="/send" element={<Send/>} />
          <Route path="/report" element={<Report/>} />
            

          </Routes>

        </main>

      </div>

    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default Bavaria;
