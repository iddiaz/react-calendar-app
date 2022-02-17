
import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

import { CalendarScreen } from './../../../components/calendar/CalendarScreen';
import { messages } from './../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';





jest.mock('../../../actions/events', ()=>({
   eventSetActive: jest.fn(),
   eventStarLoading: jest.fn()
}));



const middelewares = [thunk];
const mockStore = configureStore(middelewares); 

Storage.prototype.setItem = jest.fn();

const initState = {
   calendar: {
      events: []
   },
   auth: {
      uid: '123',
      name: 'Ivan'
   },
   ui: {
      modalOpen: false
   }

};
const store = mockStore( initState );
store.dispatch = jest.fn();



const wrapper = mount(
   <Provider store={ store }> 
      <CalendarScreen />
   </Provider>
)



describe('Pruebas en <CalendarScreen/> ', ()=>{
  
   test('Debe mosntrarse correctamente', ()=>{

      expect( wrapper ).toMatchSnapshot();

   });

   test('Prueba con las interacciones del calendario', ()=>{

      const calendar = wrapper.find('Calendar');

      const calendarMessages = calendar.prop('messages');
      // console.log(calendarMessages);
      expect( calendarMessages).toEqual( messages );

      calendar.prop('onDoubleClickEvent')();
      expect( store.dispatch ).toHaveBeenCalledWith({type: types.uiOpenModal });

      calendar.prop('onSelectEvent')({start:'hola'});
      expect( eventSetActive ).toHaveBeenCalledWith({start:'hola'});

      act(()=>{
         calendar.prop('onView')('week');
         expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');
      });

   });

})