function createReducer(functions = {}, initialState = null) {
  const actions = {};

  Object.keys(functions).forEach(name => {
    actions[name] = payload => {
      return {
        type: name,
        payload
      };
    };
  });

  const reducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    if ((fn = functions[type])) return fn(state, payload);

    return state;
  };

  return { reducer, actions };
}

module.exports = createReducer;
