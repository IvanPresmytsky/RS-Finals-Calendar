import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AddEvent from './AddEvent.js';
import Header from './Header.js';
import LogIn from './LogIn.js';
import MonthView from './monthView/MonthView.js';
import NavAndTools from './NavAndTools.js';
import Register from './Register.js';
import ScheduleView from './scheduleView/ScheduleView.js';

import configureStore from '../store/configureStore.js';

import {SET_VIEW_MONTH, SET_VIEW_SCHEDULE} from '../constants/actions.js';


export class App extends Component {

  getCurrentView (view) {
    switch (view) {
      case SET_VIEW_MONTH:
        return <MonthView />;
      case SET_VIEW_SCHEDULE:
        return <ScheduleView />;
      default:
        throw new Error("invalid view!");
      }
  }

  render () {
    console.log(this.props);

    let calendarView = this.getCurrentView(this.props.view);

    return (
      <div className="container">
         <div className="wrapper">
           <Header />
           <NavAndTools />
         </div>
         {calendarView}
         <LogIn />
         <Register />
         <AddEvent />
      </div>
    );
  }
};

App.propTypes = {
  view: React.PropTypes.string.isRequired,
}

function mapStateToProps (state) {
  return {
    view: state.views.view,
  };
}


export default connect(mapStateToProps, null)(App);

