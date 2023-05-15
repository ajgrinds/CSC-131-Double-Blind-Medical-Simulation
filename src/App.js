import {Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./JaneHopkins/scenes/dashboard";
import Patient from "./JaneHopkins/scenes/patient";
import PatientDetails from "./JaneHopkins/scenes/patientdetails"
import Doctor from "./JaneHopkins/JaneHopkins";
import Bavaria from "./Bavaria/Bavaria";
import FDA from "./FDA/FDA";
import AddPatient from "./JaneHopkins/scenes/addpatient";
import LoginPage from "./authentication/scenes/login/Index";
import RegisterPage from "./authentication/scenes/register/Index"
//import Report from "./Bavaria/scenes/report";
//import Send from "./Bavaria/scenes/send";
//import BavariaPatients from "./Bavaria/scenes/patients";
import CreateDrug from "./Bavaria/scenes/createDrug";
import TrackDosage from "./JaneHopkins/scenes/trackDosage";
import PatientDosage from "./JaneHopkins/scenes/patientDosage";
import TrialProgress from "./Bavaria/scenes/trialProgress";
import FinalReport from "./Bavaria/scenes/finalReport";
import { useState, useContext, Context } from "react";
import { TrackChanges } from "@mui/icons-material";
import { AuthProvider } from "./authentication/context/AuthContext";
import Admin from "./JaneHopkins/scenes/admin";
import ProtectedRoute from "./authentication/protectedRoutes/ProtectedRoutes"

function App() {

  return ( 
    <AuthProvider>
      <Routes>
      
      { /* Login Page */}

      <Route exact path="/" element={<LoginPage/>}/>

      { /* Register Page */}

      <Route exact path="/Register" element={<RegisterPage/>}/>

      {/*Routes for JaneHopkins Page */}
      <Route path="/JaneHopkins/*" element={<Doctor/>} />

      <Route element={<ProtectedRoute allowedRoles={'JaneHopkins'} />} >

        <Route path="/JaneHopkins/admin" element={<Admin/>}/>
        <Route path="/JaneHopkins/patient" element={<Patient/>}/>
        <Route path="/JaneHopkins/addpatient" element={<AddPatient/>} />
        <Route path="/JaneHopkins/patient/:id" element={<PatientDetails/>}/>
        <Route path="/JaneHopkins/trackdosage" element={<TrackDosage/>}/>
        <Route path="/JaneHopkins/trackdosage/:id" element={<PatientDosage/>} />

      </Route>
          
      {/*Routes for Bavaria page */}
      <Route element = {<ProtectedRoute allowedRoles={'Bavaria'} />} >

        <Route path="/bavaria/*" element={<Bavaria/>}>
          <Route path="createDrug" element={<CreateDrug/>}/>  
          <Route path="study" element={<TrialProgress/>}/>
          <Route path="report/:id" element={<FinalReport />} />
        </Route>
        
      </Route>

      {/*Routes for FDA page */}  
      <Route element = {<ProtectedRoute allowedRoles = {'FDA'} />}> 

        <Route exact path="/fda/*" element={<FDA/>} />

      </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
