import '../../stylesheets/components/monthViewComponents/monthBody.css';

import fecha from 'fecha';
import React, { Component } from 'react';

import Day from './Day.js';
import Week from './Week.js';

import date from '../../utils/date.js';
import { moveAt } from '../../utils/position.js';


export class MonthBody extends Component {
  onEventMouseMove (e) {
    moveAt(e);
  }

  onEventDragStart (e) {
    return false;
  }

  onSelectStart () {
    return false;
  }

  onEventMouseUp (e) {
    if (!e.target.classList.contains('event-body')) return;
    
    let event = e.target;
    event.style.width = "";
    event.classList.add('event--hidden');
    let day = document.elementFromPoint(e.pageX, e.pageY);

    if (!day.classList.contains('month-view__day')) return;
    
    day.appendChild(event);
    event.classList.remove('event--hidden');
    console.log(day.id);
    let arr = this.props.events;
    let draggedEvent = arr.find(function (item) {
      return item.id === event.id;
    });
    let changedProps = day.id;
    console.log(draggedEvent);
    this.props.eventAdded(draggedEvent, changedProps);

    event.classList.remove('event--position-absolute');

    return false;
  }

  defineDayEvents (id) {
    return this.props.events.filter((event) => event.date === id );
  }

  createDayTemplate(day) {
    let id = fecha.format(day, 'YYYY-MM-DD');
    let currentDate = date.curentDateFormated();
    let dayEvents = this.defineDayEvents(id);
    let dayNumsArr = date.dayNums(this.props.currentMonthIndex);
    let currentMonth = dayNumsArr[Math.round(dayNumsArr.length/2)].getMonth();
    dayNumsArr = date.splitDaysToWeeks(dayNumsArr);
      
    return (
      <Day 
        key={id} 
        id={id} 
        day={day} 
        currentDate={currentDate}
        currentMonth={currentMonth} 
        events={dayEvents}
        currentMonthIndex={this.props.currentMonthIndex}
        addEventOpen={this.props.addEventOpen} 
        changeMonth={this.props.changeMonth}
      />
    );
  }

  createWeekTemplate(week, index) {
    let daysTemplate = week.map(this.createDayTemplate.bind(this));
    return (
      <Week key={index} daysTemplate={daysTemplate} />
    );
  }

  render () {
    let dayNumsArr = date.dayNums(this.props.currentMonthIndex);
    dayNumsArr = date.splitDaysToWeeks(dayNumsArr);

    let MonthBodyTemplate = dayNumsArr.map(this.createWeekTemplate.bind(this));

    return (
      <div className="month-body"
        onMouseMove={this.onEventMouseMove.bind(this)} 
        onMouseUp={this.onEventMouseUp.bind(this)} 
        onDragStart={this.onEventDragStart.bind(this)} 
        onSelectStart={this.onSelectStart.bind(this)} 
      >
        {MonthBodyTemplate}
      </div>
    );
  }
};

MonthBody.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired,
  events: React.PropTypes.array.isRequired,
  addEventOpen: React.PropTypes.func.isRequired,
  eventAdded: React.PropTypes.func.isRequired,
  changeMonth: React.PropTypes.func.isRequired
}

export default MonthBody;


