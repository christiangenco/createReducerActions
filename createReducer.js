function createReducer(functions = {}, initialState = null) {
  const reducer = null;
  const actions = {};

  Object.keys(functions).forEach(name => {
    actions[name] = payload => {
      return {
        type: name.toUpperCase(),
        payload
      };
    };
  });

  return { reducer, actions };
}

module.exports = createReducer;
