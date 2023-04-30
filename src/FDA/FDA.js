import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {Routes, Route, useLocation} from "react-router-dom";
import TopBar from "./scenes/topbar";

import FDAStudies from "./scenes/studies";
import FDADetails from "./scenes/details";
import FDAStudy from "./scenes/study";
import "./scenes/smooth.css";
import { StudiesProvider } from './scenes/studies/studiesData';

function FDA() {

  const [theme, colorMode] = useMode();
  const location = useLocation();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div style={{ height: '100%', width: '100%' }}>
            <TopBar />
            <main>
              <TransitionGroup>
                <CSSTransition key={location.key} classNames="smooth" timeout={300}>
                  <StudiesProvider>
                    <Routes location={location}>
                      <Route path="/details/:studyID" element={<FDADetails />} />
                      <Route path="/" element={<FDAStudy />} />
                    </Routes>
                  </StudiesProvider>
                </CSSTransition>
              </TransitionGroup>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default FDA;
