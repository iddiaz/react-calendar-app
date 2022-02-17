
import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';


import { AppRouter } from '../../router/AppRouter';


const middelewares = [thunk];
const mockStore = configureStore(middelewares);

const initState = {
   auth: {
      checking: true
   }
};

const store = mockStore( initState );
// store.dispatch = jest.fn();




describe('Pruebas en <ApprRouter/>', ()=>{
   
   
   test('Debe hacer match con snapshot', () => { 

      const initState = {
         auth: {
            checking: true
         }
      };
      
      const wrapper = mount(
         <Provider store={ store }>
            <MemoryRouter>
               <AppRouter />
            </MemoryRouter> 
         </Provider> 
      )
      
      expect( wrapper).toMatchSnapshot();
      // or
      expect(wrapper.find('h5').exists() ).toBe(true);

   });


   test('Debe mostrar la ruta pública', () => { 

      const initState = {
         auth: {
            checking: false,
            uid: null
         }
      };

      const store = mockStore( initState );
      
      const wrapper = mount(
         <Provider store={ store }>         
            <AppRouter />          
         </Provider> 
      )
      
      expect( wrapper).toMatchSnapshot();
   
      expect(wrapper.find('.login-container').exists() ).toBe(true);

   });


   test('Debe mostrar la ruta privada', () => { 

      const initState = {
         calendar: {
            events: []
         },
         ui:{
            modalOpen: false
         },
         auth: {
            checking: false,
            uid: '123',
            name: 'Ivan'
         }
      };

      const store = mockStore( initState );
      
      const wrapper = mount( 
         <Provider store={ store }>         
            <AppRouter />          
         </Provider> 
      )
      
      expect( wrapper ).toMatchSnapshot();   
      expect(wrapper.find('.calendar-screen').exists() ).toBe(true);

   });


})