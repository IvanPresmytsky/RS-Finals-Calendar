import fecha from 'fecha';

import {SET_MONTH, SET_DAY} from '../constants/actions.js';

function totalDaysNums(monthIncreaser) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  const totalDaysCount = 42;

  if(monthIncreaser) {
    date = new Date(year, month + monthIncreaser);
  }
  
  let createDayNumsArray = createDayNumsArrayFunction(date);
  let dayNums = Array.from({length: totalDaysCount}, createDayNumsArray);

  return dayNums;
};

function createDayNumsArrayFunction(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let prevMonthDaysCount = new Date(year, month, 0).getDate();
  let firstDay = new Date(year, month, 1).getDay();
  let firstDayIndex = (firstDay > 0) ? (firstDay - 1) : 6;

  return (item, i) => {
    if (i >= firstDayIndex) return new Date(year, month, (i - firstDayIndex + 1));

    let previousMonthDay = (prevMonthDaysCount + 1) - (firstDayIndex - i);
    return new Date(year, month - 1, previousMonthDay);
  };
}

function splitToWeeks(arr) {
  const weekCount = 6;
  return Array.from({length: weekCount}, (item, i) => {
    return arr.splice(0, 7);
  });
}

function sortByTime (events) {
  return events.sort( (a, b) => {
    if (a.date.localeCompare(b.date) === 0) {
      return a.startTime.localeCompare(b.startTime);
    }
    return a.date.localeCompare(b.date);
  });
}

function defineActualEvents(eventArr, increaser) {
  let incr = increaser || 0;
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let currentDate = fecha.format(new Date(year, month, day + incr), 'YYYY-MM-DDHH:mm');
  return eventArr.filter((e) => {
      return (e.date + e.startTime) >= currentDate;
    });
}

function getCurrentFormatedDate () {
  return fecha.format(new Date(), 'YYYY-MM-DD');
}

function getActualDate(filter, index) {

  let currentDate = new Date();
  if (arguments.length === 0) return fecha.format(currentDate, 'dddd MMMM Do, YYYY');
  if (filter === SET_DAY) {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate() + index;
    return fecha.format(new Date(year, month, day), 'dddd MMMM Do, YYYY');
  }
  let daysNumArr = totalDaysNums(index);
  let middleIndex = Math.round(daysNumArr.length/2);
  let month = daysNumArr[middleIndex].getMonth();
  let year = daysNumArr[middleIndex].getFullYear();

  let date = new Date(year, month);
  let isMonthEqual = currentDate.getMonth() === date.getMonth();
  let isYearEqual = currentDate.getFullYear() === date.getFullYear();

  if (isYearEqual && isMonthEqual) return fecha.format(currentDate, 'dddd MMMM Do, YYYY');

  return fecha.format(date, 'MMMM, YYYY');
}

function getOriginalId () {
  return Date.now();
}

export default {
  dayNums: totalDaysNums,
  splitDaysToWeeks: splitToWeeks,
  sortedEvents: sortByTime,
  actualEvents: defineActualEvents,
  actualDate: getActualDate,
  curentDateFormated: getCurrentFormatedDate,
  originalKey: getOriginalId
};

