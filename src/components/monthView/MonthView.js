import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DayEventsPopup from './DayEventsPopup.js';
import EventMenu from './EventMenu.js';
import MonthHeader from './MonthHeader.js';
import MonthBody from './MonthBody.js';

import { openAddEventForm,
         openEventMenu,
         closeEventMenu,
         openDayEventsPopup,
         closeDayEventsPopup } from '../../actions/popups.js';
import { eventAdded, changeEvent, deleteEvent } from '../../actions/events.js';
import { changeTargetDate } from '../../actions/pagination.js';

import '../../stylesheets/components/monthView/monthView.css';

export class MonthView extends Component {
  render () {
    return (
      <div className="month-view">
        <MonthHeader />
        <MonthBody 
          targetDate={this.props.targetDate}
          events={this.props.events} 
          openAddEventForm={this.props.openAddEventForm} 
          eventAdded={this.props.eventAdded} 
          openDayEventsPopup={this.props.openDayEventsPopup}
          openEventMenu={this.props.openEventMenu}
          changeTargetDate={this.props.changeTargetDate}
        />
        <DayEventsPopup 
          events={this.props.events}
          closeDayEventsPopup={this.props.closeDayEventsPopup}
          openEventMenu={this.props.openEventMenu}
          visibility={this.props.dayEventsPopupVisibility}
          position={this.props.dayEventsPopupPosition}
          dayId={this.props.dayEventsPopupTargetDayId}
        />
        <EventMenu 
          closeEventMenu={this.props.closeEventMenu}
          visibility={this.props.eventMenuVisibility}
          position={this.props.eventMenuPosition}
          event={this.props.eventMenuTargetEvent}
          deleteEvent={this.props.deleteEvent}
          changeEvent={this.props.changeEvent}
          openAddEventForm={this.props.openAddEventForm}
        />
      </div>
    );
  }
};

MonthView.propTypes = {
  targetDate: React.PropTypes.object.isRequired,
  events: React.PropTypes.array.isRequired,
  dayEventsPopupVisibility: React.PropTypes.bool.isRequired,
  dayEventsPopupPosition: React.PropTypes.object.isRequired,
  dayEventsPopupTargetDayId: React.PropTypes.string,
  eventMenuVisibility: React.PropTypes.bool.isRequired,
  eventMenuPosition: React.PropTypes.object.isRequired,
  eventMenuTargetEvent: React.PropTypes.object,
  openAddEventForm: React.PropTypes.func.isRequired,
  openDayEventsPopup: React.PropTypes.func.isRequired,
  closeDayEventsPopup: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired,
  closeEventMenu: React.PropTypes.func.isRequired,
  eventAdded: React.PropTypes.func.isRequired,
  changeEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired,
  changeTargetDate: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    targetDate: state.pagination.targetDate,
    events: state.events.events,
    dayEventsPopupVisibility: state.popups.dayEventsPopupVisibility,
    dayEventsPopupPosition: state.popups.dayEventsPopupPosition,
    dayEventsPopupTargetDayId: state.popups.dayEventsPopupTargetDayId,
    eventMenuVisibility: state.popups.eventMenuVisibility,
    eventMenuPosition: state.popups.eventMenuPosition,
    eventMenuTargetEvent: state.popups.eventMenuTargetEvent
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openAddEventForm: bindActionCreators(openAddEventForm, dispatch),
    openDayEventsPopup: bindActionCreators(openDayEventsPopup, dispatch),
    closeDayEventsPopup: bindActionCreators(closeDayEventsPopup, dispatch),
    openEventMenu: bindActionCreators(openEventMenu, dispatch),
    closeEventMenu: bindActionCreators(closeEventMenu, dispatch),
    eventAdded: bindActionCreators(eventAdded, dispatch),
    changeEvent: bindActionCreators(changeEvent, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch),
    changeTargetDate: bindActionCreators(changeTargetDate, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthView);
