import React , {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openAddEventForm } from '../actions/popups.js';
import { changeView } from '../actions/views.js';
import { setMonth, setDay } from '../actions/pagination.js';

import {SET_VIEW_MONTH, SET_VIEW_SCHEDULE} from '../constants/actions.js';

import '../stylesheets/components/navAndTools.css';

export class NavAndTools extends Component{
  getCounter (e, index) {
    let counter = index;
    let btn = e.target.dataset.btn;

    if (btn ==="next") return ++counter;
    if (btn ==="prev") return --counter;
    if (btn ==="today") return 0;
  }

  onPaginationClick (e) {
    e.preventDefault();
    if (this.props.view === SET_VIEW_MONTH) {
      let counter = this.getCounter(e, this.props.currentMonthIndex);
      this.props.changeMonth(counter);
    } else if (this.props.view === SET_VIEW_SCHEDULE) {
      let counter = this.getCounter(e, this.props.currentDayIndex);
      this.props.changeDay(counter);
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
    this.props.changeView(SET_VIEW_SCHEDULE);
  }

  render () {
    return (
      <section className="nav-and-tools">
        <div className="nav-and-tools__pagination">
          <a href="#" className="btn add-task-btn" onClick={this.onBtnAddEventClick.bind(this)}>Add new event</a>
          <a href="#" className="btn prev-btn" data-btn="prev" onClick={this.onPaginationClick.bind(this)}> prev </a>
          <a href="#" className="btn today-btn" data-btn="today" onClick={this.onPaginationClick.bind(this)}>Today</a>
          <a href="#" className="btn next-btn" data-btn="next" onClick={this.onPaginationClick.bind(this)}> next </a>
          <span className="current-date">{this.props.currentDate}</span>
        </div>
        <div className="nav-and-tools__filters">
          <a href="#" className="btn month-btn" onClick={this.onMonthFilterClick.bind(this)}> month </a>
          <a href="#" className="btn schedule-btn" onClick={this.onScheduleFilterClick.bind(this)}> schedule </a>
        </div>
      </section>
    );
  }
};

NavAndTools.propTypes = {
  view: React.PropTypes.string.isRequired,
  currentMonthIndex: React.PropTypes.number.isRequired,
  currentDayIndex: React.PropTypes.number.isRequired,
  currentDate: React.PropTypes.string.isRequired,
  changeMonth: React.PropTypes.func.isRequired,
  changeDay: React.PropTypes.func.isRequired,
  changeView: React.PropTypes.func.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    view: state.views.view,
    currentMonthIndex: state.pagination.monthIndex,
    currentDayIndex: state.pagination.dayIndex,
    currentDate: state.pagination.date
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changeMonth: bindActionCreators(setMonth, dispatch),
    changeDay: bindActionCreators(setDay, dispatch),
    changeView: bindActionCreators(changeView, dispatch),
    openAddEventForm: bindActionCreators(openAddEventForm, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(NavAndTools);
