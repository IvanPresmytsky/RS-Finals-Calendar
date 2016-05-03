var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var daysCount = new Date(year, (month+1), 0).getDate();
var prevMonthDaysCount = new Date(year, month, 0).getDate();
var firstDay = new Date(year, month, 1).getDay();
var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};

function totalDaysNums() {
  var totalDaysCount = 42;
  var firstDayIndex = (firstDay > 0) ? (firstDay - 1) : 6;
  var arr = new Array(totalDaysCount).fill(0);
  var counter = 1;
  var counter2 = 1;
  var counter3 = prevMonthDaysCount - firstDayIndex + 1;
  arr = arr.map(function(item,i){
    if(i < firstDayIndex) return counter3++;
    if(i > (daysCount + firstDayIndex)-1) return counter2++;
    return counter++;
  });
  return arr;
};

function splitToWeeks(arr) {
  var newArr = new Array(6).fill([]);
  newArr = newArr.map(function(item, i){
    return arr.splice(0, 7);
  });
  return newArr;
}

var dayNums = splitToWeeks(totalDaysNums());

date = date.toLocaleString('ru', options);

var dateAPI = {
  date: date,
  dayNums: dayNums
}

module.exports = dateAPI;
