import {Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./JaneHopkins/scenes/dashboard";
import Patient from "./JaneHopkins/scenes/patient";
import PatientDetails from "./JaneHopkins/scenes/patientdetails"
import Doctor from "./JaneHopkins/JaneHopkins";
import Bavaria from "./Bavaria/Bavaria";
import FDA from "./FDA/FDA";
import FDAPatient from "./FDA/scenes/patient"
import FDADashboard from "./FDA/scenes/dashboard";


function App() {

  return ( 

    <Routes>
      
      {/*Routes for JaneHopkins Page */}
      <Route path="/*" element={<Doctor/>}>
        
        <Route path="patient" element={<Patient/>}/>
        <Route path="patient/:id" element={<PatientDetails/>}/>

      </Route>

      {/*Routes for FDA page */}
      
      <Route exact path="/fda/*" element={<FDA/>}>

        <Route path="patient" element={<FDAPatient/>} />
        
      </Route>

      {/*Routes for Bavaria page */}
      <Route path="/bavaria/*" element={<Bavaria/>}>


      </Route>

    </Routes>
    
  );
}

export default App;
