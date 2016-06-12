import '../../stylesheets/components/monthView/monthWeek.css';

import React, { Component } from 'react';


export class Week extends Component {
  render () {
    let daysTemplate = this.props.daysTemplate;
    return (
      <div className="month-view__week">
        {daysTemplate}
      </div>
    );
  }
};

Week.propTypes = {
  daysTemplate: React.PropTypes.array.isRequired
}

export default Week;
