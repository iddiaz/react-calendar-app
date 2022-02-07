import React, { useEffect } from 'react';

//V5 imports
// import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, Routes } from "react-router-dom";
//V6
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CalendarScreen } from './../components/calendar/CalendarScreen';

import { LoginScreen } from './../components/auth/LoginScreen';
import { startChecking } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

   const dispatch = useDispatch();

    const { checking, uid } = useSelector( state => state.auth );



   useEffect(()=>{
      dispatch( startChecking() );
   }, [dispatch])

   console.log(checking);

   if( checking ){
      return (<h5>Espere...</h5>);
   }
  
  
   return (

      //v5
      // <Router>
      //    <div>
      //       <Switch>
      //          <Route exact path="/login" component={LoginScreen} />
      //          <Route exact path="/login" component={CalendarScreen} />
      //       </Switch>
      //    </div>
      // </Router>
      
      // v6
      <BrowserRouter>
         <Routes>
            {/* <Route  path="/login" element={<LoginScreen/>} /> */}
            <Route path="/login" element={
                     <PublicRoute uid={ uid }>
                        <LoginScreen />
                     </PublicRoute>
               } />

                      

            <Route  path="/*" element={
                 <PrivateRoute uid={uid}>
                     <CalendarScreen />
                  </PrivateRoute> 
               } />

            {/* <Route  path="/*" element={<CalendarScreen/>} /> */}
         </Routes>
      </BrowserRouter>
    
   );
 
};
