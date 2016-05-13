var styleConstants = require('../constants/styleConstans.js');

function countAddEventPosition (dayPosition) {
  var windowWidth = document.body.clientWidth;
  var windowHeight = document.body.clientHeight;
  var overWidth = windowWidth - dayPosition.left - styleConstants.ADD_EVENT_WIDTH;
  var overHeight = windowHeight - dayPosition.top - styleConstants.ADD_EVENT_HEIGHT;
  var actualLeft = (overWidth < 0) ? (dayPosition.left + overWidth) : dayPosition.left;
  var actualTop = (overHeight < 0) ? (dayPosition.top + overHeight) : dayPosition.top;

  return {
    top: actualTop,
    left: actualLeft
  };
}

module.exports = countAddEventPosition;
