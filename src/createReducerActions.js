const produce = require("immer").default;

function createReducerActions(
  functions = {},
  initialState = null,
  options = {}
) {
  const actionPrefix = options.actionPrefix || "";
  const mutable = !!options.mutable;

  const actions = {};

  Object.keys(functions).forEach(name => {
    actions[name] = payload => {
      return {
        type: actionPrefix + name,
        payload
      };
    };
  });

  const reducer = (state = initialState, action = {}) => {
    let { type } = action;

    if (type) type = type.replace(actionPrefix, "");

    if (functions.hasOwnProperty(type)) {
      if (mutable) {
        return produce(state, draft => functions[type](draft, action));
      } else {
        return functions[type](state, action);
      }
    }

    return state;
  };

  return { reducer, actions };
}

module.exports = createReducerActions;
