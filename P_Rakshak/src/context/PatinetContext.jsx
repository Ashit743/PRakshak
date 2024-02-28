import { createContext, useContext, useState } from "react";
const PatientContext = createContext({
  patientProfile: {},
  setpatientProfile: () => {},
});

export const usePatientProfile = () => {
  return useContext(PatientContext);
};
export const PatientProvider = ({ children }) => {
  const [patientProfile, setPatientProfile] = useState([]);
  const value = {
    patientProfile,
    setPatientProfile,
  };
  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};
