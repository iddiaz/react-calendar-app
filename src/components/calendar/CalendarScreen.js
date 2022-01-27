import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css'; 

import { Navbar } from './../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { messages } from './../../helpers/calendar-messages-es';
import { CalendarModal } from './CalendarModal';

import { useDispatch } from 'react-redux';
import { uiOpenModal } from './../../actions/ui';

moment.locale('es');


const localizer = momentLocalizer(moment);

const events = [{
  title: 'Cumpleaños del compañero',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'Comprar regalo',
  user: {
     _id: '123',
     name: 'Ivan'
  }
}]



export const CalendarScreen = () => {

   const [lastView, setLastView] = useState(localStorage.getItem('lastView'));
   console.log( 'lastView', lastView );

   const dispatch = useDispatch();

  const eventsStyleGetter = ( event, start, end, isSelected )=>{
   
    // console.log( event, start, end, isSelected );

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',  
      color: 'white'
    }

    return {
      style
    }
  }


  const onDobleClick = ( e )=>{
      console.log(e);
      console.log('abrir modal');
      dispatch( uiOpenModal() );


  }

  const onSelect = (e)=>{
     console.log(e);

  }
  const onViewChange = (e)=>{
     setLastView(e);
     localStorage.setItem('lastView', e )

  }


  return <div className='calendar-screen'>

      <Navbar/>

      <Calendar
         localizer={localizer}
         events={ events }
         startAccessor="start"
         endAccessor="end"
         messages={messages}
         eventPropGetter={eventsStyleGetter}
         onDoubleClickEvent={onDobleClick}
         onSelectEvent={onSelect}
         onView={ onViewChange }
         view={lastView || 'month'}
         // style={{ height: 100vh }}
         components={{
            event: CalendarEvent
         }}
      />

      <CalendarModal/>



  </div>
};
