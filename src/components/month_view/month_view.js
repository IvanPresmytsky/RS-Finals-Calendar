import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MonthHeader from './month_header/month_header';
import MonthBody from './month_body/month_body';

import { openAddEventForm } from '../popups/add_event_form/add_event_form_actions';
import { openEventMenu } from '../popups/event_menu/event_menu_actions';
import { closePopup } from '../popups/popups_actions';
import { addEvent, editEvent, saveEvent, deleteEvent } from '../../actions/events';
import { changeTargetDate } from '../../actions/pagination';

import './month_view.css';

export class MonthView extends Component {
  render () {
    return (
      <div className="month-view">
        <MonthHeader />
        <MonthBody
          userId={this.props.userId}
          targetDate={this.props.targetDate}
          events={this.props.events}
          eventMenuTargetEvent={this.props.eventMenuTargetEvent}
          openAddEventForm={this.props.openAddEventForm} 
          addEvent={this.props.addEvent} 
          saveEvent={this.props.saveEvent}
          deleteEvent={this.props.deleteEvent}
          editEvent={this.props.editEvent}
          openEventMenu={this.props.openEventMenu}
          changeTargetDate={this.props.changeTargetDate}
          closePopup={this.props.closePopup}
        />
      </div>
    );
  }
};

MonthView.propTypes = {
  userId: React.PropTypes.string,
  targetDate: React.PropTypes.object.isRequired,
  events: React.PropTypes.array.isRequired,
  eventMenuTargetEvent: React.PropTypes.object,
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  editEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired,
  closePopup: React.PropTypes.func.isRequired,
  changeTargetDate: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    userId: state.authorization.id,
    targetDate: state.pagination.targetDate,
    events: state.events.events,
    eventMenuTargetEvent: state.popup_reducer.popupOptions.actualEvent
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openAddEventForm: bindActionCreators(openAddEventForm, dispatch),
    openEventMenu: bindActionCreators(openEventMenu, dispatch),
    closePopup: bindActionCreators(closePopup, dispatch),
    addEvent: bindActionCreators(addEvent, dispatch),
    saveEvent: bindActionCreators(saveEvent, dispatch),
    editEvent: bindActionCreators(editEvent, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch),
    changeTargetDate: bindActionCreators(changeTargetDate, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthView);
