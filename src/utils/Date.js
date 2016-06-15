import fecha from 'fecha';

import { TODAY, NEXT_MONTH, PREVIOUS_MONTH, NEXT_DAY, PREVIOUS_DAY} from '../constants/pagination.js';

export function getTargetDate(date, constant) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  switch (constant) {
    case NEXT_MONTH:
      return new Date(year, month + 1);
    case PREVIOUS_MONTH:
      return new Date(year, month - 1);
    case NEXT_DAY:
      return new Date(year, month, day + 1);
    case PREVIOUS_DAY:
      return new Date(year, month, day - 1);
    case TODAY:
      return new Date();
    default:
      return new Date();
  }
}

export function getTargetMonthDays(date){
  const totalDaysCount = 42;
  let createTargetMonthDaysArray = createTargetMonthDaysArrayFunction(date);
  let targetMonthDaysArray = Array.from({length: totalDaysCount}, createTargetMonthDaysArray);
  return targetMonthDaysArray;
}

function createTargetMonthDaysArrayFunction(date) {
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

export function getCurrentFormatedDate () {
  return fecha.format(new Date(), 'YYYY-MM-DD');
}

export function sortEventsByTime (events) {
  return events.sort( (a, b) => {
    if (a.date.localeCompare(b.date) === 0) {
      return a.startTime.localeCompare(b.startTime);
    }
    return a.date.localeCompare(b.date);
  });
}

export function getActualEvents(eventArr, date) {
  let currentDate = fecha.format(date, 'YYYY-MM-DDHH:mm');
  return eventArr.filter((e) => {
      return (e.date + e.startTime) >= currentDate;
    });
}

export function getOriginalId () {
  return Date.now();
}


