import classNames from 'classnames';
import React, { Component } from 'react';

import { weekDays } from '../../constants/weekDays.js'

import '../../stylesheets/components/monthView/monthHeader.css';

export class MonthHeader extends Component {
  renderMonthHeader(day, index) {
    let dayClass = classNames('month-header__day-name', {
      ' day-name-holiday': index > 4
    });
    return (
      <div key={day} className={dayClass}>
        <span className="month-header__day-name-text">{day}</span>
      </div>
    );
  }

  render () {
    let monthHeader = weekDays.map(this.renderMonthHeader.bind(this));
    return (
      <div className="month-header">
        {monthHeader}
      </div>
    );
  }
};

export default MonthHeader;
