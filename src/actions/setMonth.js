function setMonth (index) {
  return {
    type: 'SET_MONTH',
    payLoad: index
  };
}

module.exports = setMonth;
