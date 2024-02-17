import React from 'react';
import mockDoctorData from '../../mock/doctorsSlots.json'
import DoctorCard from '../doctor-cards/doctorCards';
import './availableDoctors.css'

// Define the available doctors data
const doctors = mockDoctorData

// Define the Doctor component
const DoctorComponent = () => {
    return (
        <>
            <h1>Available Doctors</h1>
        <div class="doctor-container">
          {doctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              availability={doctor.availability}
            />
          ))}
        </div>
    </>
      );
};

export default DoctorComponent;
