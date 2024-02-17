import MonthlyCalendar from "./components/calendar/Calendar"
import "./App.css"
import DoctorComponent from "./components/manual-appointment/availableDoctors"
import AppointmentList from "./components/dummy/dummy"

function App() {

  return (
   <div>
      <div className="calendar">
        {/* <MonthlyCalendar></MonthlyCalendar>
        <DoctorComponent></DoctorComponent> */}
        <AppointmentList patientId="9380340883" />
      </div>
   </div>
  )
}



export default App
