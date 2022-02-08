import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css'; 

import { Navbar } from './../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { messages } from './../../helpers/calendar-messages-es';
import { CalendarModal } from './CalendarModal';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from './../../actions/ui';
import { eventSetActive, eventClearActiveEvent, eventStarLoading  } from '../../actions/events';
import { AddNewFab } from './../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');


const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

   const [lastView, setLastView] = useState(localStorage.getItem('lastView'));


   const dispatch = useDispatch();
   
   useEffect(() => {
    
      dispatch( eventStarLoading() );
   
   }, [dispatch]);
   


   //lee los eventos del store
   const { events, activeEvent } = useSelector( state => state.calendar ); 
   const { uid } = useSelector( state => state.auth ); 


  const eventsStyleGetter = ( event, start, end, isSelected )=>{

    const style = {
      backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
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

      dispatch( uiOpenModal() );


  }

  const onSelect = (e)=>{

     dispatch( eventSetActive( e ) );


  }
  const onViewChange = (e)=>{
     setLastView(e);
     localStorage.setItem('lastView', e )

  }

  const onSelectSlot = (e)=>{
  
      dispatch( eventClearActiveEvent() );
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
         onSelectSlot={ onSelectSlot }
         selectable={ true }
         onView={ onViewChange }
         view={lastView || 'month'}
         // style={{ height: 100vh }}
         components={{
            event: CalendarEvent
         }}
      />

      <AddNewFab />

      { (activeEvent) && <DeleteEventFab /> }

      <CalendarModal/>



  </div>
};
