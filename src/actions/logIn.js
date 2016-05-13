function logIn (visibility) {
  return {
    type: 'LOG_IN',
    payLoad: visibility
  };
}

module.exports = logIn;