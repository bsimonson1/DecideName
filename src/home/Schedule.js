import { useState, useRef } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Views } from 'react-big-calendar';

import './Schedule.css';
import Calendar from './Calendar';
import ExampleEvents from './ExampleEvents';
import AddEventModal from '../Components/AddEventModal';
import DeleteEventModal from '../Components/DeleteEventModal';


const Schedule = ({changeExpValue}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState(ExampleEvents);
    const dialogRefAdd = useRef(null);
    const dialogRefDelete = useRef(null);
    const [currentEvent, setCurrentEvent] = useState(events[0]);
    const [totalExp, setTotalExp] =useState(0); //replace later

    /*THIS SECTION IS FOR ADDING THE EVENTS*/
    const openModal = () => {
      if (dialogRefAdd.current) dialogRefAdd.current.close();
      if (dialogRefAdd.current) dialogRefAdd.current.showModal();
    };

    const closeModal = () => {
      if (dialogRefAdd.current) dialogRefAdd.current.close();
    };

    const handleDateSelection = ({start, end}) => {
      setSelectedDate({start, end});
      openModal();
    };

    const handleEventConfirmation = ({eventName, priority}) => {
      // change this later
      setEvents([
        ...events,
        {
          id: events.length + 1,
          title: eventName,
          start: selectedDate.start,
          end: selectedDate.end,
          priority: priority,
        },
      ]);
      closeModal();
    };

    /* THIS SECTION IS FOR DELETING EVENTS */
    const openDeleteModal = () => {
      if (dialogRefDelete.current) dialogRefDelete.current.close();
      if (dialogRefDelete.current) dialogRefDelete.current.showModal();
    };

    const closeDeleteModal = () => {
        if (dialogRefDelete.current) dialogRefDelete.current.close();
    };

    const handleEventSelection = (event) => {
      setCurrentEvent(event);
      openDeleteModal();
    };

    const handleEventDeletion = () => {
      //fix later
      const newEvents = events.filter((event) => event.id !== currentEvent.id);
      setEvents(newEvents);
      closeDeleteModal();
    };

    const handleEventCompletion = () => {
      //fix later
      const newTotalExp = totalExp + calculateExp(currentEvent);
      setTotalExp(newTotalExp);
      changeExpValue(newTotalExp);
      const newEvents = events.filter((event) => event.id !== currentEvent.id);
      setEvents(newEvents);
      closeDeleteModal();
    };

    const calculateExp = (event) => {
      //fix later
      return (event.priority * (event.end - event.start) / (3600*1000));
    }

    return (
        <div className="calendar-container">
          <Calendar
            views={[Views.MONTH, Views.DAY]}
            defaultView={[Views.MONTH]}
            selectable={true}
            events={events}
            onSelectSlot={handleDateSelection}
            onSelectEvent={handleEventSelection}
          />
          <AddEventModal 
            dialogRef={dialogRefAdd}
            openModal={openModal} 
            closeModal={closeModal} 
            onConfirm={handleEventConfirmation}
          />
          <DeleteEventModal
            dialogRef={dialogRefDelete}
            openModal={openDeleteModal} 
            closeModal={closeDeleteModal} 
            onDelete={handleEventDeletion}
            onComplete={handleEventCompletion}
            eventName={currentEvent.title}
            eventPriority={currentEvent.priority}
            eventExp={calculateExp(currentEvent)}
          />
        </div>
      );
};

export default Schedule;