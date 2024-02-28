import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./Calendar.css"; // Import CSS file for custom styling
import mockPatientEvents from "../../mock/appointments.json";
import { getCalendarData } from "../../service/calendar";

function MonthlyCalendar() {
  const [open, setOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCalendarData();
      console.log(response)
      setEvents(response);
    } catch (error) {
      setError(error);
      setEvents(mockPatientEvents);
      console.log("api failed fetching from mock..");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleEventClick(eventInfo) {
    setEventInfo(eventInfo);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (

    <div className='row'>
      <div className='col-3'>
        <div className='row'>
          <div className='col-12 appointemnt-box'>
            <table class="table caption-top">
              <caption className='text-center'>Coming Appointments</caption>
              <thead className='table-success mt-2'>
                <tr>
                  <th scope="col">Doctor</th>
                  <th scope="col">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Dr. Pathak</th>
                  <td>
                    <div>2nd Jan 2024</div>
                    <div className='font-secondary-12'>12:00 PM</div>
                  </td>
                </tr>

              </tbody>
            </table>

            <div className='text-center'>Visit Details </div>
            <div className='d-flex'>
              <span>
                <img src='assets/pin.png' height={25} />
              </span>
              <span style={{ fontSize: '12px' }}>
                21/2 (Old No.2), 14th Cross, 3rd Block, Jayanagar, Bangalore – 560 011
              </span>
            </div>
            <div className='mt-2 mb-2 d-flex'>
              <span className='me-2'>
                <img src='assets/date-time.png' height={20} />
              </span>
              <span><strong>Date & Time:  </strong></span>
              <span className='ms-2'>
                2nd Feb 2024 -
              </span>
              <span className='ms-3 '>
                12:00 PM
              </span>
            </div>

            <div className='mt-2 mb-2 d-flex'>
              <span className='me-2'>
                <img src='assets/phone-call.png' height={20} />
              </span>
              <div>
                <div>+(91)-80-4612 4444</div>
                <div>+(91)-80-4612 4666</div>
              </div>
            </div>

          </div>

          <div className='col-12 appointemnt-box mt-3'>
            <table class="table caption-top">
              <caption className='text-center'>Last Appointments</caption>
              <thead className='table-success mt-2'>
                <tr>
                  <th scope="col">Doctor</th>
                  <th scope="col">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Dr. Pathak</th>
                  <td>
                    <div>2nd Jan 2024</div>
                    <div className='font-secondary-12'>12:00 PM</div>
                  </td>
                </tr>

                <tr>
                  <th scope="row">Dr. Pathak</th>
                  <td>
                    <div>2nd Jan 2024</div>
                    <div className='font-secondary-12'>12:00 PM</div>
                  </td>
                </tr>

                <tr>
                  <th scope="row">Dr. Pathak</th>
                  <td>
                    <div>2nd Jan 2024</div>
                    <div className='font-secondary-12'>12:00 PM</div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </div>

      <div className='col calendar-wrapper'>
        <div className="calendar-container">
          {loading && <p>Loading...</p>}
          {events.length > 0 &&(
            <div className="calendar">
              <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]} // Include interactionPlugin
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                eventClick={handleEventClick}
                selectable={true}
                aspectRatio={2.2}

                  //   editable={true} // Make events editable
                  //   droppable={true} // Make events droppable
                />
              </div>
          )}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Event Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Doctor: {eventInfo && eventInfo.event.extendedProps.doctor} <br />
                Patient Name:{" "}
            {eventInfo && eventInfo.event.extendedProps.patientName} <br />
                Patient Phone Number:{" "}
            {eventInfo && eventInfo.event.extendedProps.patientPhoneNumber}{" "}
            <br />
                Start Time:{" "}
            {eventInfo &&
              new Date(eventInfo.event.start).toLocaleTimeString()}{" "}
            <br />
                End Time:{" "}
            {eventInfo && new Date(eventInfo.event.end).toLocaleTimeString()}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>


  );
}

export default MonthlyCalendar;
