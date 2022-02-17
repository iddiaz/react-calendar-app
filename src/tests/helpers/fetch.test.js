
import { fetchSinToken, fetchConToken } from './../../helpers/fetch';

describe('Pruebas en el helper fetch', ()=>{

   let token ='';

   test('fetchSinToken debe funcionar', async()=>{

      const resp = await fetchSinToken( 'auth', {email: 'correo@correo.com', password: '123456'}, 'POST' );

      expect ( resp instanceof Response ).toBe(true); 

      const body = await resp.json();
      expect(body.ok).toBe(true);

      token = body.token; 

   });

   test('fetchConToken debe funcionar', async()=>{

      localStorage.setItem('token', token);

      const resp = await fetchConToken('events/61fbb6f26fe3c4d0419e2f45',{}, 'DELETE');

      const body = await resp.json();
      console.log(body);

      expect(body.msg).toBe('Evento no existe');

   });
   
});