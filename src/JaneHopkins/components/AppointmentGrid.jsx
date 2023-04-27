import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const AppointmentGrid = () => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("Enter a title for your appointment:");
    if (title) {
      const newEvent = {
        id: events.length + 1,
        start,
        end,
        title
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEdit = ({ event }) => {
    if (event && event.title) {
      const title = window.prompt("Edit appointment title:", event.title);
      if (title) {
        const updatedEvents = events.map((e) => {
          if (e.id === event.id) {
            return { ...e, title };
          }
          return e;
        });
        setEvents(updatedEvents);
      }
    }
  };
  

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this appointment?");
    if (confirmed) {
      const updatedEvents = events.filter((e) => e.id !== id);
      setEvents(updatedEvents);
    }
  };
  
  useEffect(() => {
    
  }, []);

  useEffect(() => {
    
  }, [events]);

  const styles = {
    calendarText: {
      color: "white"
    }
  }

  return (
    
    <div style={{ height: "350pt", width: "100%" }}>
     
       <Calendar
        localizer={localizer}
        events={events}
        startAccessor={(event) => moment(event.start).toDate()}
        endAccessor={(event) => moment(event.end).toDate()}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEdit}
        onDoubleClickEvent={(event) => handleDelete(event.id)}
        //style={{ border: '1px solid white', color: 'white', }}
        
       
        toolbar={{
          style: {
            backgroundColor: 'grey',
            color: 'white'
          }
        }}
        
        eventPropGetter={() => ({
          style: {
            backgroundColor: 'grey',
            color: 'white',
            border: '1px solid white',
          },
        })}
        dayPropGetter={() => ({
          style: {
            backgroundColor: 'transparent',
            color: 'white',
          }
        })}
        weekPropGetter={() => ({
          style: {
            backgroundColor: 'transparent',
            color: 'white',
          }
        })}
        monthPropGetter={() => ({
          style: {
            backgroundColor: 'transparent',
            color: 'white',
          }
        })}
        
      /> 
    </div>
  );
};

export default AppointmentGrid;
