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
import Login from "./authentication/scenes/login/Index";
import Register from "./authentication/scenes/register/Index";



function App() {

  return ( 

    <Routes>
     
      <Route exact path="/" element={<LoginPage/>}/>
      <Route exact path="/Register" element={<RegisterPage/>}/>
      
      <Route path="/JaneHopkins/*" element={<Doctor/>}/>
      <Route exact path="/fda/*" element={<FDA/>}/>
      <Route path="/bavaria/*" element={<Bavaria/>}/>
       

    </Routes>
    
  );
}

export default App;
