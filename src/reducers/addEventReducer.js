var initialState = {
  visibility: false
}

function addEventFormState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case 'ADD_EVENT':
      return Object.assign({}, state, {visibility: action.payLoad});
    default:
      return state;
  }
}

module.exports = addEventFormState;
