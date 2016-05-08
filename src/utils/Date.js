var flatten = require('array-flatten');

function totalDaysNums(monthIncreaser) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var totalDaysCount = 42;

  if(monthIncreaser) {
    date = new Date(year, month + monthIncreaser);
  }
  
  var createDayNumsArray = createDayNumsArrayFunction(date);
  var dayNums = Array.from({length: totalDaysCount}, createDayNumsArray);

  return splitToWeeks(dayNums);
};

function getCurrentMonth(arr) {
  arr = flatten(arr);
  var currentMonth = arr.reduce(function (total, next) {
    return (total + next.getMonth())/2;
  }, arr[0].getMonth());

  return Math.round(currentMonth)-1;
}

function getCurrentYear(arr) {
  arr = flatten(arr);
  var currentYear = arr.reduce(function (total, next) {
    return (total + next.getFullYear())/2;
  }, arr[0].getFullYear());

  return Math.round(currentYear);
}


function createDayNumsArrayFunction(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  var prevMonthDaysCount = new Date(year, month, 0).getDate();
  var firstDay = new Date(year, month, 1).getDay();
  var firstDayIndex = (firstDay > 0) ? (firstDay - 1) : 6;

  return function (item, i) {
    if (i >= firstDayIndex) return new Date(year, month, (i - firstDayIndex + 1));

    var previousMonthDay = (prevMonthDaysCount + 1) - (firstDayIndex - i);
    return new Date(year, month - 1, previousMonthDay);
  };
}

function splitToWeeks(arr) {
  var weekCount = 6;
  return Array.from({length: weekCount}, function(item, i) {
    return arr.splice(0, 7);
  });
}

function getCurrentFormatedDate () {
  var date = new Date();
  return date.toLocaleString().slice(0,10);
}

function getActualDate(year, month) {
  var options1 = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };

  var options2 = {
    year: 'numeric',
    month: 'long',
  };

  var currentDate = new Date();
  if (arguments.length === 0) return currentDate.toLocaleString('ru', options1);

  var date = new Date(year, month);
  var isMonthEqual = currentDate.getMonth() === date.getMonth();
  var isYearEqual = currentDate.getFullYear() === date.getFullYear();

  if (isYearEqual && isMonthEqual) return currentDate.toLocaleString('ru', options1);

  return date.toLocaleString('ru', options2);
}

module.exports = {
  dayNums: totalDaysNums,
  currentMonth: getCurrentMonth,
  currentYear: getCurrentYear,
  actualDate: getActualDate,
  curentDateFormated: getCurrentFormatedDate
}

