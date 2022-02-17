
import { types } from '../../types/types';
import { authReducer } from './../../reducers/authReducer';



const initState = {
   checking: true,
   // uid: null,
//   name:null
}

describe('Pruebas en authReducer', ()=>{


   test('Debe retornar el estado por defecto', ()=>{
     
      const action = {};
      const state = authReducer(initState, action );
      expect( state ).toEqual( initState );

   });

   test('Debe autenticar al usuario', ()=>{
      
      const action = {
         type: types.authLogin,
         payload: {
            uid:'123',
            name:'Ivan'
         }     
      }
   
      const state = authReducer( initState, action );
      expect ( state ).toEqual( { checking: false, uid: '123', name: 'Ivan' } );
   
      console.log(state); 
 
   });





})