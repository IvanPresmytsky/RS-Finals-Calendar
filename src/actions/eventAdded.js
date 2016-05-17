var eventsArr = [];

function eventAdded (event, newProps) {
  if (eventsArr.length > 0 && eventsArr.indexOf(event) !== -1) {
    console.log(eventsArr.indexOf(event));
    event.date = newProps;
    //event.id = event.title + event.date + event.startTime;
    console.log(event);
  } else {
    eventsArr.push(event);
  }
  
  return {
    type: 'EVENT_ADDED',
    events: eventsArr
  };
}

module.exports = eventAdded;
