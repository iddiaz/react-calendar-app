import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startLogin, startRegister, startChecking } from './../../actions/auth';
import { types } from './../../types/types';
import  Swal  from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', ()=> ({
   fire: jest.fn()
}) );

const middelewares = [thunk];
const mockStore = configureStore(middelewares);

const initState = {};
let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();
let token = '';



describe( 'Pruebas en las acciones aut', ()=> {

   beforeEach(()=>{
      store = mockStore(initState);
      jest.clearAllMocks();
   }); 


   test('startLogin correcto', async()=>{
     
      await store.dispatch( startLogin('correo@correo.com', '123456') );
      const actions =  store.getActions();
      // console.log(actions); 

      expect(actions[0]).toEqual({
         type: types.authLogin,
         payload: {
            uid: expect.any(String), 
            name: expect.any(String)
         }
         
      })

      expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
      expect(localStorage.setItem).toHaveBeenCalledWith('token-init-state', expect.any(Number)); 

      token = localStorage.setItem.mock.calls[0][1];

      // console.log(localStorage.setItem.mock.calls[0][1]);  


   });


   test('startLogin incorrecto', async()=>{
      await store.dispatch( startLogin('correo@correo.com', '1234523446') );
      const actions =  store.getActions();
      // console.log(actions); 
      expect(actions).toEqual([]);
      // console.log(Swal); 
      expect( Swal.fire ).toHaveBeenCalledWith("Error", "Usuario o contraseña incorrecta: dev[password]", "error");  

   } );


   test('startRegiter corecto', async()=>{
      
      //mock fetchSinToken solo para esta prueba pasando valores 
      fetchModule.fetchSinToken = jest.fn(()=>({
            json() {
               return {
                  ok: true,
                  uid: '123',
                  token: 'ABCABCABC123',
                  name: 'PEPE'
               }
            }
         })
      );

      await store.dispatch( startRegister('test111@test.com','1234556', 'test') );
      const actions = store.getActions();
      // console.log(actions);
      
      expect( actions[0] ).toEqual({
         type: types.authLogin,
         payload: {
            uid: '123',
            name: 'PEPE'
         }
      })
      
      expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
      expect(localStorage.setItem).toHaveBeenCalledWith('token-init-state', expect.any(Number)); 

   });

   test('startChecking correcto', async()=>{

      fetchModule.fetchConToken = jest.fn(()=>({
         json() {
               return {
                  ok: true,
                  uid: '123',
                  token: 'ABCABCABC123',
                  name: 'PEPE'
               }
            }
         })
      );


      await store.dispatch( startChecking() );
      const actions = store.getActions();
      localStorage.setItem('token', token);
      // console.log(actions); 

      expect (actions[0]).toEqual({
         type: types.authLogin,
         payload: {
            uid: '123',
            name: 'PEPE'
         }
      })

      expect( localStorage.setItem).toHaveBeenCalledWith('token', 'ABCABCABC123');
   })

})