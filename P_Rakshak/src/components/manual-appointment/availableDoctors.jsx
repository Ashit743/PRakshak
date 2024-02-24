import React, { useState, useEffect } from "react";
import mockDoctorData from "../../mock/doctorsSlots.json";
import DoctorCard from "../doctor-cards/doctorCards";
import "./availableDoctors.css";
import { getDoctorSlots } from "../../service/doctors";



// Define the Doctor component
const DoctorComponent = () => {
  const [doctors, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getDoctorSlots();
      setData(response);
    } catch (error) {
      setError(error);
      setData(mockDoctorData);
      console.log(doctors);
      console.log("api failed fetching from mock..");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      <div className="doctor-container">
        {doctors.length > 0 &&
          doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
            />
          ))}
      </div>
    </>
  );
};

export default DoctorComponent;
