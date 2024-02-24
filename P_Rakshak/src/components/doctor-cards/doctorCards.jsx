import React, { useState } from "react";
import "./doctorCards.css";
import { useAppoinments } from "../../context/DoctorsCtx";
import moment from 'moment';
const DoctorCard = ({ id, name, specialty, availability }) => {
  const randomImageId = Math.floor(Math.random() * 1000); // Generate a random image ID
  const { setAppoinments } = useAppoinments();
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingCategory, setBookingCategory] = useState("");

  const handleBookAppointment = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (bookingDate < currentDate) {
      alert("Please select a future date for booking.");
      return;
    }

    // Here you can save the booking details to your array for booked slots
    const newBooking = {
      title: "Booked",
      start: `${bookingDate}T${bookingTime}:00`, // Assuming time format is 'HH:mm'
      end:`${bookingDate}T${parseInt(bookingTime)+45}:00`,
      doctor: name,
    };
    // {
    //   "title": "Booked",
    //   "start": "2024-02-15T10:00:00",
    //   "end": "2024-02-15T10:30:00",
    //   "doctor": "Dr. Arun",
    //   "patientName": "Pratam H",
    //   "patientPhoneNumber": "111-222-3333",
    //   "category": "checkup"
    // },
    console.log("New Booking:", newBooking);
  };

  return (
    <div className="doctor-card">
      <img
        src={`https://picsum.photos/300/200?random=${randomImageId}`}
        alt={`Dr. ${name}`}
      />
      <div className="doctor-details">
        <h3>{name}</h3>
        <p>Specialty: {specialty}</p>
        <div className="booking-form">
          <input
            type="date"
            id="booking-date"
            value={bookingDate}
            min={new Date().toISOString().split("T")[0]} // Set minimum date to current date
            onChange={(e) => setBookingDate(e.target.value)}
          />
          <input
            type="time"
            id="booking-time"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
          />
          <button className="book-button" onClick={handleBookAppointment}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
