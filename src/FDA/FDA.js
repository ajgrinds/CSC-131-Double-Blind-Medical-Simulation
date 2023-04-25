import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import TopBar from "./scenes/topbar";
import FDADashboard from "./scenes/dashboard";
import FDASidebar from "./scenes/sidebar";
import FDAPatient from "./scenes/patient";
import FDAStudies from "./scenes/studies";
import "./scenes/smooth.css";

function FDA() {

  const [theme, colorMode] = useMode();
  const location = useLocation();

  return ( 
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div style={{height: "100%", width: "100%"}} className="app">

       <FDASidebar/>

        <main className="content">
          <TopBar/>
        
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

    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default FDA;
