import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useJaneHopkins from '../vendiaHooks/useJaneHopkins';

function PatientDetails() {
  const { id } = useParams();
  const { entities } = useJaneHopkins();
  const [patient, setPatient] = useState(null);
 
  console.log(id);

  useEffect(() => {
    async function fetchPatient() {
      
        const response = await entities.patient.get(id);
        console.log(response);
        setPatient(response);
    }
    fetchPatient();
  }, [entities.patient, id]);

  
  return (
    <div>
    {patient ? (
      <>
        <p>Name: {patient.name}</p>
        <p>Date of Birth: {patient.dob}</p>
        <p>Insurance Number: {patient.insuranceNumber}</p>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}

export default PatientDetails;
