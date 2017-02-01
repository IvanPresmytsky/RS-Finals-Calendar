import React , {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fecha from 'fecha';

import { openAddEventForm } from '../../popups/add_event_form/add_event_form_actions';
import { changeView } from '../../../actions/views.js';
import { changeTargetDate } from '../../../actions/pagination.js';

import { SET_VIEW_MONTH, SET_VIEW_SCHEDULE } from '../../../constants/actions';
import { TODAY, NEXT_MONTH, PREVIOUS_MONTH, NEXT_DAY, PREVIOUS_DAY} from '../../../constants/pagination';

import './nav_and_tools.css';

export class NavAndTools extends Component{
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
    if (this.props.view === SET_VIEW_SCHEDULE || date.getMonth() === currentDate.getMonth()) {
      return fecha.format(date, 'dddd MMMM Do, YYYY');
    }
    return fecha.format(date, 'MMMM, YYYY');
  }

  onTodayBtnClick (e) {
    e.preventDefault();
    this.props.changeTargetDate(TODAY);
  }

  onNextBtnClick (e) {
    e.preventDefault();
    if (this.props.view === SET_VIEW_MONTH) {
      this.props.changeTargetDate(NEXT_MONTH);
    } else if (this.props.view === SET_VIEW_SCHEDULE) {
      this.props.changeTargetDate(NEXT_DAY);
    } 
  }

  onPrevBtnClick (e) {
    e.preventDefault();
    if (this.props.view === SET_VIEW_MONTH) {
      this.props.changeTargetDate(PREVIOUS_MONTH);
    } else if (this.props.view === SET_VIEW_SCHEDULE) {
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
    e.preventDefault();
    this.props.changeTargetDate(TODAY);
    this.props.changeView(SET_VIEW_SCHEDULE);
  }

  render () {
    let actualDate = this.getActualDate(this.props.targetDate);
    return (
      <section className="nav-and-tools">
        <div className="nav-and-tools__pagination">
          <a href="#" className="btn add-task-btn" onClick={this.onBtnAddEventClick}>Add new event</a>
          <a href="#" className="btn prev-btn" data-btn="prev" onClick={this.onPrevBtnClick}> prev </a>
          <a href="#" className="btn today-btn" data-btn="today" onClick={this.onTodayBtnClick}>Today</a>
          <a href="#" className="btn next-btn" data-btn="next" onClick={this.onNextBtnClick}> next </a>
          <span className="current-date">{actualDate}</span>
        </div>
        <div className="nav-and-tools__filters">
          <a href="#" className="btn month-btn" onClick={this.onMonthFilterClick}> month </a>
          <a href="#" className="btn schedule-btn" onClick={this.onScheduleFilterClick}> schedule </a>
        </div>
      </section>
    );
  }
};

NavAndTools.propTypes = {
  view: React.PropTypes.string.isRequired,
  targetDate: React.PropTypes.object.isRequired,
  changeView: React.PropTypes.func.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  changeTargetDate: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    view: state.views.view,
    targetDate: state.pagination.targetDate,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changeView: bindActionCreators(changeView, dispatch),
    openAddEventForm: bindActionCreators(openAddEventForm, dispatch),
    changeTargetDate: bindActionCreators(changeTargetDate, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(NavAndTools);
