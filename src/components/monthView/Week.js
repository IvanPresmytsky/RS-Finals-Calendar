import React, { Component } from 'react';

import '../../stylesheets/components/monthView/monthWeek.css';

export class Week extends Component {
  render () {
    let days = this.props.days;
    return (
      <div className="month-view__week">
        {days}
      </div>
    );
  }
};

Week.propTypes = {
  days: React.PropTypes.array.isRequired
}

export default Week;
