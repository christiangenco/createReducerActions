const createReducerActions = require("./createReducerActions");

test("createReducerActions exports a function", () => {
  expect(typeof createReducerActions).toBe("function");
});

test("createReducerActions exports a function that returns an object with keys `reducer` and `actions`", () => {
  const { reducer, actions } = createReducerActions();
  expect(reducer).toBeDefined();
  expect(actions).toBeDefined();
});

describe("createReducerActions counter", () => {
  const initialState = 0;
  const { reducer, actions } = createReducerActions(
    {
      increment: state => state + 1,
      decrement: state => state - 1,
      add: (state, payload) => state + payload,
      sub: (state, payload) => state - payload
    },
    initialState
  );

  test("returns an action for each inputted mutation function", () => {
    expect(Object.keys(actions)).toHaveLength(4);
    expect(Object.keys(actions)).toEqual([
      "increment",
      "decrement",
      "add",
      "sub"
    ]);
  });

  test("actions are action creators", () => {
    expect(actions.increment()).toEqual({
      type: "increment",
      payload: undefined
    });
  });

  test("reducer returns the initialState", () => {
    expect(reducer()).toEqual(0);
  });

  test("reducer returns the state with an unknown action", () => {
    expect(reducer(5, { type: "lol" })).toEqual(5);
  });

  test("reducer increments the state when the increment action is dispatched", () => {
    expect(reducer(5, actions.increment())).toEqual(6);
  });

  test("reducer adds the payload to the state when add action is dispatched", () => {
    expect(reducer(4, actions.add(2))).toEqual(6);
  });
});

// const {reducer, actions} = createReducerActions({
//   add: (state, {payload}) => {state + payload}
// }, 0);
//
// actions.add(1)
