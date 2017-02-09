import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import Calendar from './components/calendar';
import CalendarView from './components/calendar_view/calendar_view';
import MonthView from './components/calendar_view/month_view/month_view';
import ScheduleView from './components/calendar_view/schedule_view/schedule_view';
import UserSettings from './components/user_settings/user_settings';

const requireAuth = (nextState, replace, callback) => {
  console.log(sessionStorage);
  if(!sessionStorage.user) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
    callback();
};

export default function createRoutes() {
  return (
    <Route path="/" component={Calendar} >
      <IndexRedirect to="/schedule" />
      <Route component={CalendarView}>
        <Route path="/schedule" component={ScheduleView} />
        <Route path="/month" component={MonthView} />
      </Route>
      <Route path="/settings" component={UserSettings} onEnter={requireAuth} />
    </Route>
  );
};
