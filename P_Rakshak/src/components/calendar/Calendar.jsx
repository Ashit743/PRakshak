import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './Calendar.css'; // Import CSS file for custom styling
import mockPatientEvents from '../../mock/appointments.json'
import axios from 'axios'

const fetchUrl = 'https://api.example.com/data'

function MonthlyCalendar() {
  const [open, setOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  const [events,setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
        const response = await axios.get(fetchUrl);
        setData(response.doctors);
    } catch (error) {
        setError(error);
        setData(mockPatientEvents);
        console.log("api failed fetching from mock..")
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
    <div className="calendar-container">
      {loading && <p>Loading...</p>}
      {events.length>0 && 
      <div className="calendar">
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin,interactionPlugin]} // Include interactionPlugin
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          eventClick={handleEventClick}
          selectable ={true}
          aspectRatio={2.2}

        //   editable={true} // Make events editable
        //   droppable={true} // Make events droppable
        />
      </div>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Doctor: {eventInfo && eventInfo.event.extendedProps.doctor} <br />
            Patient Name: {eventInfo && eventInfo.event.extendedProps.patientName} <br />
            Patient Phone Number: {eventInfo && eventInfo.event.extendedProps.patientPhoneNumber} <br />
            Start Time: {eventInfo && new Date(eventInfo.event.start).toLocaleTimeString()} <br />
            End Time: {eventInfo && new Date(eventInfo.event.end).toLocaleTimeString()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MonthlyCalendar;
