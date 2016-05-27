import '../stylesheets/components/monthView.css';

import React, { Component } from 'react';

import MonthHeader from './monthViewComponents/MonthHeader.js';
import MonthBody from './monthViewComponents/MonthBody.js';

export class MonthView extends Component{
  render () {
    return (
      <div className="month-view">
        <MonthHeader />
        <MonthBody 
          addEventOpen={this.props.addEventOpen} 
          eventAdded={this.props.eventAdded} 
          changeMonth={this.props.changeMonth} 
          currentMonthIndex={this.props.currentMonthIndex} 
          events={this.props.events} 
        />
      </div>
    );
  }
};

MonthView.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired,
  events: React.PropTypes.array.isRequired,
  addEventOpen: React.PropTypes.func.isRequired,
  eventAdded: React.PropTypes.func.isRequired,
  changeMonth: React.PropTypes.func.isRequired
}

export default MonthView;
