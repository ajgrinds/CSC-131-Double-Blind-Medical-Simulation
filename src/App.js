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


function App() {

  return ( 

    <Routes>
      
      {/*Routes for JaneHopkins Page */}
      <Route path="/" element={<Doctor/>}>

        
        <Route path="/patient" element={<Patient/>}/>
        <Route path="/addpatient" element={<AddPatient/>}/>
        <Route path="/patient/:id" element={<PatientDetails/>}/>

      </Route>

      {/*Routes for FDA page */}
      {/* Make sure to put pull path name with /fda/... <-- (...) = the route you want it to go to  */}
      <Route exact path="/fda" element={<FDA/>}>

        <Route path="/fda/patient" element={<FDAPatient/>} />
        
      </Route>

      {/*Routes for Bavaria page */}
      <Route path="/bavaria" element={<Bavaria/>}>


      </Route>

    </Routes>
    
  );
}

export default App;
