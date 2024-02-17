import React, { useState } from 'react';
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
import mockPatientEvents from '../../mock/patientsData.json'

const events = mockPatientEvents

function MonthlyCalendar() {
  const [open, setOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);



  function handleEventClick(eventInfo) {
    setEventInfo(eventInfo);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="calendar-container">
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
