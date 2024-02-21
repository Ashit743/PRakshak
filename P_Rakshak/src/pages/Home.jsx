import React from "react";
import MonthlyCalendar from "../components/calendar/Calendar";
import DoctorComponent from "../components/manual-appointment/availableDoctors";
import "../App.css";
export default function Home() {
  return (
    <div className="calendar">
      <MonthlyCalendar></MonthlyCalendar>
      <DoctorComponent></DoctorComponent>
    </div>
  );
}
