import React, { Component } from 'react';
import Toolbar from './toolbar/toolbar';

export class CalendarView extends Component {
  render() {
    return (
      <div className="calendar-view">
        <Toolbar />
        {this.props.children}
      </div>
    );
  }
}

CalendarView.propTypes = {
  children: React.PropTypes.object,
}

export default CalendarView;
