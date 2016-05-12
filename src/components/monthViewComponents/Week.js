require('../../stylesheets/components/monthViewComponents/monthWeek.css');
var React = require('react');

var Week = React.createClass({
  render: function () {
    var daysTemplate = this.props.daysTemplate;

    return (
      <div className="month-view__week">
        {daysTemplate}
      </div>
    );
  }
});

Week.propTypes = {
  daysTemplate: React.PropTypes.array.isRequired
}

module.exports = Week;
