import {Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./JaneHopkins/scenes/dashboard";
import Patient from "./JaneHopkins/scenes/patient";
import PatientDetails from "./JaneHopkins/scenes/patientdetails"
import Doctor from "./JaneHopkins/JaneHopkins";
import Bavaria from "./Bavaria/Bavaria";
import FDA from "./FDA/FDA";
import FDAPatient from "./FDA/scenes/patient"
import FDADashboard from "./FDA/scenes/dashboard";
import AddPatient from "./JaneHopkins/scenes/addpatient";
import LoginPage from "./authentication/scenes/login/Index";
import RegisterPage from "./authentication/scenes/register/Index"
import Report from "./Bavaria/scenes/report";
import Send from "./Bavaria/scenes/send";
import BavariaPatients from "./Bavaria/scenes/patients";
import LoginPage from "./authentication/Index";
import CreateDrug from "./Bavaria/scenes/createDrug";
import TrackDosage from "./JaneHopkins/scenes/trackDosage";
import PatientDosage from "./JaneHopkins/scenes/patientDosage";


function App() {

  return ( 

    <Routes>
      
      { /* Login Page */}

      <Route exact path="/" element={<LoginPage/>}/>

      { /* Register Page */}

      <Route exact path="/Register" element={<RegisterPage/>}/>

      

      {/*Routes for JaneHopkins Page */}
      <Route path="/JaneHopkins/*" element={<Doctor/>}>
        
        <Route path="patient" element={<Patient/>}/>
        <Route path="addpatient" element={<AddPatient/>} />
        <Route path="patient/:id" element={<PatientDetails/>}/>
        <Route path="trackdosage" element={<TrackDosage/>}/>
        <Route path="trackdosage/:id" element={<PatientDosage/>} />

      </Route>

      {/*Routes for FDA page */}
      
      <Route exact path="/fda/*" element={<FDA/>}>

        <Route path="patient" element={<FDAPatient/>} />
        
      </Route>

      {/*Routes for Bavaria page */}
      <Route path="/bavaria/*" element={<Bavaria/>}>
        
        <Route path="createDrug" element={<CreateDrug/>}/>
        
        
      </Route>

    </Routes>
    
  );
}

export default App;
