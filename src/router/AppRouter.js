import React from 'react';

//V5 imports
// import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, Routes } from "react-router-dom";
//V6
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CalendarScreen } from './../components/calendar/CalendarScreen';
import { LoginScreen } from './../components/auth/LoginScreen';

export const AppRouter = () => {
  
  
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
            <Route  path="/" element={<CalendarScreen/>} />
            <Route  path="/*" element={<CalendarScreen/>} />
            <Route  path="/login" element={<LoginScreen/>} />
         </Routes>
      </BrowserRouter>
    
   );
 
};
