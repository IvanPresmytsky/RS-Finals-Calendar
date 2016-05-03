var React = require('react');
require('../stylesheets/components/toolbar.css');

var ToolBar = React.createClass({
  render: function () {
    return (
      <section className="main-toolbar">
        <ul className="tools-list">
          <li>
            <a href="#" className="add-task-btn">Add new task</a>
          </li>
          <li>
            <a href="#" className="open-task-list-btn">Open tasks list</a>
          </li>
        </ul>
      </section>
    );
  }
});

module.exports = ToolBar;
