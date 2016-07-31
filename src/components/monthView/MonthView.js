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
import { addEvent, editEvent, saveEvent, deleteEvent } from '../../actions/events.js';
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
          userId={this.props.userId}
          openAddEventForm={this.props.openAddEventForm} 
          addEvent={this.props.addEvent} 
          saveEvent={this.props.saveEvent}
          openDayEventsPopup={this.props.openDayEventsPopup}
          openEventMenu={this.props.openEventMenu}
          changeTargetDate={this.props.changeTargetDate}
        />
        <DayEventsPopup 
          events={this.props.events}
          userId={this.props.userId}
          visibility={this.props.dayEventsPopupVisibility}
          position={this.props.dayEventsPopupPosition}
          dayId={this.props.dayEventsPopupTargetDayId}
          closeDayEventsPopup={this.props.closeDayEventsPopup}
          openEventMenu={this.props.openEventMenu}
          addEvent={this.props.addEvent}
          saveEvent={this.props.saveEvent}
        />
        <EventMenu 
          userId={this.props.userId}
          visibility={this.props.eventMenuVisibility}
          position={this.props.eventMenuPosition}
          event={this.props.eventMenuTargetEvent}
          deleteEvent={this.props.deleteEvent}
          editEvent={this.props.editEvent}
          openAddEventForm={this.props.openAddEventForm}
          closeEventMenu={this.props.closeEventMenu}
        />
      </div>
    );
  }
};

MonthView.propTypes = {
  userId: React.PropTypes.string,
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
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  editEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired,
  changeTargetDate: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    userId: state.authorization.id,
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
    addEvent: bindActionCreators(addEvent, dispatch),
    saveEvent: bindActionCreators(saveEvent, dispatch),
    editEvent: bindActionCreators(editEvent, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch),
    changeTargetDate: bindActionCreators(changeTargetDate, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthView);
