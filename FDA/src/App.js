import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route} from "react-router-dom";
import TopBar from "./scenes/global/TopBar";
import SideBar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
//import Patient from "./scenes/Patient";
//import PatientDetails from "./PatientDetails";

//import Invoices from "./scenes/invoices";
//import Contacts from "./scenes/contacts";
//import Bar from "./scenes/bar";
//import Form from "./scenes/form";
//import Line from "./scenes/line";
//import Pie from "./scenes/pie";
//import FAQ from "./scenes/faq";
//import Geography from "./scenes/geography";
//import Calendar from "./scenes/calendar";

function App() {

  const [theme, colorMode] = useMode();

  return ( 
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        <SideBar/>
        <main className="content">
          <TopBar/>
          <Routes>
      
            <Route path="/" element={<Dashboard/>}/>
            {/*<Route path="/patient" element={<Patient/>}/>
            <Route path="patient/:id" element={<PatientDetails/>}/>*/}
            
            {/*
            <Route path="/invoices" element={<Invoices/>}/>
            <Route path="/contacts" element={<Contacts/>}/>
            <Route path="/bar" element={<Bar/>}/>
            <Route path="/form" element={<Form/>}/>
            <Route path="/pie" element={<Pie/>}/>
            <Route path="/line" element={<Line/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            <Route path="/geography" element={<Geography/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
          */}
          </Routes>
        </main>
      </div>

    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default App;