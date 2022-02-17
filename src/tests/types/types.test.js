import { types } from "../../types/types"


describe('Pruebas en Types', ()=>{

   test('Los types deben ser iguales', ()=>{

      expect( types ).toEqual({
          
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',
         
            eventSetActive: '[event] Set active',
            eventLogout: '[event] Logout event',
            eventStartAddNew: '[event] Start add new',
            eventAddNew: '[event] Add new',
         
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deeleted',
            eventLoaded: '[eent] Event loaded',
         
            authCheckinFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start token Renew',
            authLogout: '[auth] Logout'   
         
      })
   })
})