var date = require('../utils/Date.js');

function setMonth (index) {
  return {
    type: 'SET_MONTH',
    monthIndex: index,
    date: date.actualDate(index)
  };
}

module.exports = setMonth;
