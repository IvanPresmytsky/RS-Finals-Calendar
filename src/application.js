import './stylesheets/application.css';

import fecha from 'fecha';
import React from 'react';

import { Provider } from 'react-redux';
import { render } from 'react-dom';

import { configureStore } from './store/configureStore.js';

import App from './components/Application.js';

import date from './utils/date.js';

let store = configureStore();

console.log(store);

function defineNearestEvent () {
  let events = store.getState().events.events;
  if (events.length === 0) return;

  events = date.actualEvents(events);

  if (events.length === 0) return;

  event = date.sortedEvents(events)[0];

  let notificationTime = event.date + event.startTime;
  let currentDate = fecha.format(new Date(), 'YYYY-MM-DDHH:mm');
  
  if (notificationTime == currentDate) {
    const eventTemplate = `Attention! \n ${event.title} \n ${event.text} \n`
    alert(eventTemplate);
  }
}

let timer = setInterval(defineNearestEvent, 60000);

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

