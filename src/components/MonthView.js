import '../stylesheets/components/monthView.css';

import React, { Component } from 'react';

import EventsContainerPopup from './monthViewComponents/EventsContainerPopup.js';
import EventOptionsPopup from './monthViewComponents/EventOptionsPopup.js';
import MonthHeader from './monthViewComponents/MonthHeader.js';
import MonthBody from './monthViewComponents/MonthBody.js';

export class MonthView extends Component {
  render () {
    return (
      <div className="month-view">
        <MonthHeader />
        <MonthBody 
          currentMonthIndex={this.props.currentMonthIndex} 
          events={this.props.events} 
          addEventOpen={this.props.addEventOpen} 
          eventAdded={this.props.eventAdded} 
          changeMonth={this.props.changeMonth} 
          eventsContainerPopupOpen={this.props.eventsContainerPopupOpen}
          eventOptionsPopupOpen={this.props.eventOptionsPopupOpen}
        />
        <EventsContainerPopup 
          events={this.props.events}
          eventsContainerPopupClose={this.props.eventsContainerPopupClose}
          eventOptionsPopupOpen={this.props.eventOptionsPopupOpen}
          visibility={this.props.eventsContainerPopupVisibility}
          position={this.props.eventsContainerPopupPosition}
          dayId={this.props.dayId}
        />
        <EventOptionsPopup 
          eventOptionsPopupClose={this.props.eventOptionsPopupClose}
          visibility={this.props.eventOptionsPopupVisibility}
          position={this.props.eventOptionsPopupPosition}
          event={this.props.optionsPopupEvent}
          deleteEvent={this.props.deleteEvent}
          changeEvent={this.props.changeEvent}
          addEventOpen={this.props.addEventOpen}
        />
      </div>
    );
  }
};

MonthView.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired,
  events: React.PropTypes.array.isRequired,
  eventsContainerPopupVisibility: React.PropTypes.bool.isRequired,
  eventsContainerPopupPosition: React.PropTypes.object.isRequired,
  dayId: React.PropTypes.string,
  eventOptionsPopupVisibility: React.PropTypes.bool.isRequired,
  eventOptionsPopupPosition: React.PropTypes.object.isRequired,
  optionsPopupEvent: React.PropTypes.object,
  addEventOpen: React.PropTypes.func.isRequired,
  eventAdded: React.PropTypes.func.isRequired,
  changeMonth: React.PropTypes.func.isRequired,
  changeEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired,
  eventsContainerPopupOpen: React.PropTypes.func.isRequired,
  eventsContainerPopupClose: React.PropTypes.func.isRequired,
  eventOptionsPopupOpen: React.PropTypes.func.isRequired,
  eventOptionsPopupClose: React.PropTypes.func.isRequired
}

export default MonthView;
