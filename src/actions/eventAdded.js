var eventsArr = [];

function eventAdded (event) {
  eventsArr.push(event);
  return {
    type: 'EVENT_ADDED',
    events: eventsArr
  };
}

module.exports = eventAdded;
