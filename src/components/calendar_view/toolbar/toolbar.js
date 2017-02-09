import React , {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import fecha from 'fecha';

import { openAddEventForm } from '../../popups/add_event_form/add_event_form_actions';
import { changeTargetDate } from '../../../actions/pagination.js';

import { TODAY, NEXT_MONTH, PREVIOUS_MONTH, NEXT_DAY, PREVIOUS_DAY} from '../../../constants/pagination';

import './toolbar.css';

export class Toolbar extends Component{
  constructor(props) {
    super(props);
    this.onBtnAddEventClick = this.onBtnAddEventClick.bind(this);
    this.onPrevBtnClick = this.onPrevBtnClick.bind(this);
    this.onTodayBtnClick = this.onTodayBtnClick.bind(this);
    this.onNextBtnClick = this.onNextBtnClick.bind(this);
    this.onMonthFilterClick = this.onMonthFilterClick.bind(this);
    this.onScheduleFilterClick = this.onScheduleFilterClick.bind(this);
  }

  getActualDate (date) {
    let currentDate = new Date();
    if (this.props.location === '/schedule' || date.getMonth() === currentDate.getMonth()) {
      return fecha.format(date, 'dddd MMMM Do, YYYY');
    }
    return fecha.format(date, 'MMMM, YYYY');
  }

  onTodayBtnClick (e) {
    console.log(this.props.location);
    e.preventDefault();
    this.props.changeTargetDate(TODAY);
  }

  onNextBtnClick (e) {
    e.preventDefault();
    if (this.props.location === '/month') {
      this.props.changeTargetDate(NEXT_MONTH);
    } else if (this.props.location === '/schedule') {
      this.props.changeTargetDate(NEXT_DAY);
    } 
  }

  onPrevBtnClick (e) {
    e.preventDefault();
    if (this.props.location === '/month') {
      this.props.changeTargetDate(PREVIOUS_MONTH);
    } else if (this.props.location === '/schedule') {
      this.props.changeTargetDate(PREVIOUS_DAY);
    } 
  }

  onBtnAddEventClick (e) {
    e.preventDefault();
    this.props.openAddEventForm();
  }

  onMonthFilterClick (e) {
    e.preventDefault();
    this.props.changeView(SET_VIEW_MONTH);
  }

  onScheduleFilterClick (e) {
    this.props.changeTargetDate(TODAY);
     console.log(this.props.targetDate);
  }

  render () {
    let actualDate = this.getActualDate(this.props.targetDate);
    return (
      <section className="toolbar">
        <div className="toolbar__pagination">
          <a href="#" className="btn add-task-btn" onClick={this.onBtnAddEventClick}>Add new event</a>
          <a href="#" className="btn prev-btn" data-btn="prev" onClick={this.onPrevBtnClick}> prev </a>
          <a href="#" className="btn today-btn" data-btn="today" onClick={this.onTodayBtnClick}>Today</a>
          <a href="#" className="btn next-btn" data-btn="next" onClick={this.onNextBtnClick}> next </a>
          <span className="current-date">{actualDate}</span>
        </div>
        <div className="toolbar__filters">
          <Link to={{pathname: "/month"}} className="btn month-btn">month</Link>
          <Link to={{pathname: "/schedule"}} className="btn schedule-btn" onClick={this.onScheduleFilterClick}>schedule</Link>
        </div>
      </section>
    );
  }
};

Toolbar.propTypes = {
  location: React.PropTypes.string,
  targetDate: React.PropTypes.object.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  changeTargetDate: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    targetDate: state.pagination.targetDate,
    location: state.routing.locationBeforeTransitions.pathname,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openAddEventForm: bindActionCreators(openAddEventForm, dispatch),
    changeTargetDate: bindActionCreators(changeTargetDate, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
