import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route, Navigate} from "react-router-dom";

import TopBar from "./scenes/topbar";
import BavariaSidebar from "./scenes/sidebar";
import BavariaDashboard from "./scenes/dashboard";


function FDA() {

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
            

          </Routes>
  

        </main>

      </div>

    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default FDA;
