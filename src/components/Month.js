require('../stylesheets/components/month.css');
var React = require('react');
var days = require('./Date.js');
var daysArr = days['dayNums'];

var MonthHeader = React.createClass({
  render: function() {
    var days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    var monthHeaderTemplate = days.map(function(item, i){
      return (
        <th key={i}>{item}</th>
      );
    });

    return (
        <thead>
          <tr>
            {monthHeaderTemplate}
          </tr>
        </thead>
    );
  }
});

var MonthBody = React.createClass({
  render: function () {
    var bodyTemplate = daysArr.map(function(a,j){
      var monthDaysTemplate = a.map(function(item,i){
        return (
          <td key={i}>
            <div>
              <span>{item}</span>
            </div>
          </td>
        );
      });

      return (
        <tr key={j*333}>
          {monthDaysTemplate}
        </tr>
      );
    });
    return (
      <tbody>
        {bodyTemplate}
      </tbody>
    );
  }
});


var Month = React.createClass({
  render: function() {
    return (
      <table className="month">
        <MonthHeader />
        <MonthBody />
      </table>
    );
  }
});

module.exports = Month;
