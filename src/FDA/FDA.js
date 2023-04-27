import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {Routes, Route, useLocation} from "react-router-dom";
import { MyProSidebarProvider } from "./scenes/sidebar/MyProSideBar";
import TopBar from "./scenes/topbar";

import FDADashboard from "./scenes/dashboard";
import FDAStudies from "./scenes/studies";
import FDAPatient from "./scenes/patient";
import "./scenes/smooth.css";

function FDA() {

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
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="smooth" timeout={300}>
              <Routes location={location}>
                <Route path="/" element={<FDADashboard/>}/>
                <Route path="/patient" element={<FDAPatient/>}/>
                <Route path="/studies" element={<FDAStudies/>}/>
              </Routes>
            </CSSTransition>
          </TransitionGroup>

          </main>

        </div>
      </MyProSidebarProvider>
    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default FDA;
