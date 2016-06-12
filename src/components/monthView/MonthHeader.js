import classNames from 'classnames';
import React, { Component } from 'react';

import '../../stylesheets/components/monthView/monthHeader.css';

import { DAYS } from '../../constants/data/DAYS.js'

export class MonthHeader extends Component {
  createMonthHeaderTemplate(day, index) {
    let dayClass = classNames('month-header__day-name', {
      ' day-name-holiday': index > 4
    });
    return (
      <div key={day} className={dayClass}>
        <span>{day}</span>
      </div>
    );
  }

  render () {
    let monthHeaderTemplate = DAYS.map(this.createMonthHeaderTemplate.bind(this));
    return (
      <div className="month-header">
        {monthHeaderTemplate}
      </div>
    );
  }
};

export default MonthHeader;
