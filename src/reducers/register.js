var initialState = {
  visibility: false
}

function addRegisterFormState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case 'REGISTER':
      return Object.assign({}, state, {visibility: action.payLoad});
    default:
      return state;
  }
}

module.exports = addRegisterFormState;