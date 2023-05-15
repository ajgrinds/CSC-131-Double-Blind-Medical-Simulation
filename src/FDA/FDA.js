import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import TopBar from "./scenes/topbar";
import StudyDetails from "./scenes/details";
import Study from "./scenes/study";

import { StudiesProvider } from "./scenes/studies/studiesData";

import "./scenes/smooth.css";

function FDAPage() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <>
          <TopBar />
          <main>
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames="smooth"
                timeout={300}
              >
                <StudiesProvider>
                  <Routes location={location}>
                    <Route
                      path="/details/:studyID"
                      element={<StudyDetails />}
                    />
                    <Route path="/" element={<Study />} />
                  </Routes>
                </StudiesProvider>
              </CSSTransition>
            </TransitionGroup>
          </main>
        </>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default FDAPage;
