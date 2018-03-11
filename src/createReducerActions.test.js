const createReducerActions = require("./createReducerActions");

const { combineReducers } = require("redux");

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
      add: (state, { payload }) => state + payload,
      sub: (state, { payload }) => state - payload
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

// https://redux.js.org/basics/example-todo-list
describe("todoApp", () => {
  let nextTodoId = 0;
  const todoReducerActions = createReducerActions(
    {
      addTodo: (state, { payload: { text } }) => {
        return [...state, { id: nextTodoId++, text, completed: false }];
      },
      toggleTodo: (state, { payload: { index } }) =>
        state.map(
          todo =>
            todo.id === index ? { ...todo, completed: !todo.completed } : todo
        )
    },
    []
  );
  const todoReducer = todoReducerActions.reducer;
  const todoActions = todoReducerActions.actions;

  const visibilityFilterReducerActions = createReducerActions(
    {
      setVisibilityFilter: (state, { payload: { filter } }) => filter
    },
    "ALL"
  );
  const visibilityFilterReducer = visibilityFilterReducerActions.reducer;
  const visibilityFilterActions = visibilityFilterReducerActions.actions;

  const todoApp = combineReducers({
    todos: todoReducer,
    visibilityFilter: visibilityFilterReducer
  });

  const initialState = { todos: [], visibilityFilter: "ALL" };

  beforeEach(() => {
    nextTodoId = 0;
  });

  test("returns default state", () => {
    expect(todoApp()).toEqual(initialState);
  });

  test("can add todos", () => {
    expect(
      todoApp(initialState, todoActions.addTodo({ text: "goat milk" }))
    ).toEqual({
      todos: [{ completed: false, id: 0, text: "goat milk" }],
      visibilityFilter: "ALL"
    });
  });

  test("can toggle todo", () => {
    const state = todoApp(
      initialState,
      todoActions.addTodo({ text: "goat milk" })
    );

    expect(todoApp(state, todoActions.toggleTodo({ index: 0 }))).toEqual({
      todos: [{ completed: true, id: 0, text: "goat milk" }],
      visibilityFilter: "ALL"
    });
  });

  test("can set visibility filter", () => {
    expect(
      todoApp(
        initialState,
        visibilityFilterActions.setVisibilityFilter({ filter: "DONE" })
      )
    ).toEqual({
      todos: [],
      visibilityFilter: "DONE"
    });
  });
});

describe("options", () => {
  test("actionPrefix option adds a prefix to action names", () => {
    const { reducer, actions } = createReducerActions(
      {
        like: state => state + 1
      },
      0,
      {
        actionPrefix: "APP/LIKE_REDUCER/"
      }
    );

    expect(reducer(0, actions.like())).toEqual(1);
    expect(actions.like().type).toEqual("APP/LIKE_REDUCER/like");
  });

  test("mutable: true option allows state mutation", () => {
    const initialState = {
      photos: { large: { url: "" } }
    };
    const { reducer, actions } = createReducerActions(
      {
        setLargePhotoUrl: (state, { payload: { url } }) => {
          state.photos.large.url = url;
        }
      },
      initialState,
      {
        mutable: true
      }
    );

    const url = "http://lol.com/cats.png";
    const newState = reducer(initialState, actions.setLargePhotoUrl({ url }));
    expect(newState.photos.large.url).toBe(url);
    expect(initialState.photos.large.url).toBe("");
  });
});

/*
TODO: options: {mutable: true} // uses immer
TODO: import/export example in ducks style
*/
