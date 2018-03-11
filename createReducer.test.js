const createReducer = require("./createReducer");

test("createReducer exports a function", () => {
  expect(typeof createReducer).toBe("function");
});

test("createReducer exports a function that returns an object with keys `reducer` and `actions`", () => {
  const { reducer, actions } = createReducer();
  expect(reducer).toBeDefined();
  expect(actions).toBeDefined();
});

describe("createReducer increment/decrement", () => {
  const { reducer, actions } = createReducer(
    {
      increment: state => state + 1,
      decrement: state => state - 1
    },
    0
  );

  test("createReducer returns an action for each inputted mutation function", () => {
    expect(Object.keys(actions)).toHaveLength(2);
    expect(Object.keys(actions)).toEqual(["increment", "decrement"]);
  });

  test("createReducer's actions are action creators", () => {
    expect(actions.increment()).toEqual({
      type: "INCREMENT",
      payload: undefined
    });
  });

  test("createReducer's actions are action creators", () => {
    expect(actions.increment()).toEqual({
      type: "INCREMENT",
      payload: undefined
    });
  });
});

// const {reducer, actions} = createReducer({
//   add: (state, {payload}) => {state + payload}
// }, 0);
//
// actions.add(1)
