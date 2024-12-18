import { createContext, useContext, useState } from "react";

const DoctorsBookingContext = createContext({
  appoinments: [
    {
      title: "Booked",
      start: "2024-02-15T10:00:00",
      end: "2024-02-15T10:30:00",
      doctor: "Dr. Arun",
      patientName: "Pratam H",
      patientPhoneNumber: "111-222-3333",
      category: "checkup",
    },
    {
      title: "Booked",
      start: "2024-02-16T10:30:00",
      end: "2024-02-16T11:00:00",
      doctor: "Dr. Rakesh",
      patientName: "Pratam H",
      patientPhoneNumber: "444-555-6666",
      category: "checkup",
    },
    {
      title: "Booked",
      start: "2024-02-17T10:00:00",
      end: "2024-02-17T10:30:00",
      doctor: "Dr. Krishna",
      patientName: "Pratam H",
      patientPhoneNumber: "777-888-9999",
      category: "checkup",
    },
    {
      title: "Booked",
      start: "2024-02-19T10:00:00",
      end: "2024-02-19T10:30:00",
      doctor: "Dr. Smith",
      patientName: "Pratam H",
      patientPhoneNumber: "111-222-3333",
      category: "checkup",
    },
    {
      title: "Booked",
      start: "2024-02-21T10:30:00",
      end: "2024-02-21T11:00:00",
      doctor: "Dr. Patel",
      patientName: "Pratam H",
      patientPhoneNumber: "444-555-6666",
      category: "checkup",
    },
    {
      title: "Booked",
      start: "2024-02-23T10:00:00",
      end: "2024-02-23T10:30:00",
      doctor: "Dr. Khan",
      patientName: "Pratam H",
      patientPhoneNumber: "777-888-9999",
      category: "checkup",
    },
    {
      title: "Blood sugar check",
      start: "2024-02-20",
      end: "2024-02-20",
      doctor: "Dr. Patel",
      patientName: "Pratam H",
      patientPhoneNumber: "444-555-6666",
      category: "labTest",
    },
    {
      title: "Blood test",
      start: "2024-02-17",
      end: "2024-02-17",
      doctor: "Dr. Patel",
      patientName: "Pratam H",
      patientPhoneNumber: "444-555-6666",
      category: "labTest",
    },
  ],
  setAppoinments: () => {},
});

export const useAppoinments = () => {
  return useContext(DoctorsBookingContext);
};

export const AppoinmentsProvider = ({ children }) => {
  const [appoinments, setAppoinments] = useState([]);
  const value = {
    appoinments,
    setAppoinments,
  };
  return (
    <DoctorsBookingContext.Provider value={value}>
      {children}
    </DoctorsBookingContext.Provider>
  );
};
