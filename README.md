# `createReducerActions`

[![Build Status](https://travis-ci.org/christiangenco/createReducerActions.svg?branch=master)](https://travis-ci.org/christiangenco/createReducerActions)

[![NPM](https://nodei.co/npm/create-reducer-actions.png?downloads=true)](https://nodei.co/npm/create-reducer-actions/)

[`createReducerActions`](https://github.com/christiangenco/createReducerActions) is a single function that creates a [redux reducer](https://redux.js.org/basics/reducers) and linked [action creators](https://redux.js.org/basics/actions#action-creators).

You don't need to define action types or actions, and you don't need to write tedious switch/case statements in your reducers.

`createReducerActions` works like this:

```js
const initialState = 0;
const { reducer, actions } = createReducerActions(
  {
    up: state => state + 1,
    down: state => state - 1
  },
  initialState
);

actions.up(); // { type: "up" }
reducer(); // 0 === initialState
reducer(7, up()); // 8
```

# Getting Started

## Installation

```bash
$ npm install --save create-reducer-actions
// or
$ yarn add create-reducer-actions
```

## Usage with React

```jsx
// redux/counter.js
import createReducerActions from "create-reducer-actions";

const initialState = 0;
export const { reducer, actions } = createReducerActions(
  {
    increment: state => state + 1,
    decrement: state => state - 1,
    add: (state, { payload }) => state + payload,
    sub: (state, { payload }) => state - payload
  },
  initialState
);

// store.js
import { createStore, combineReducers } from "redux";

import { reducer as counter } from "./redux/counter";

const rootReducer = combineReducers({ counter });
const store = createStore(rootReducer);

export default store;


// Counter.js
import React from "react";
import { connect } from "react-redux";
import { actions } from "./redux/counter";

export const Counter = ({ counter, add, sub, increment, decrement }) => {
  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={() => add(5)}>add 5</button>
      <button onClick={() => sub(5)}>subtract 5</button>
    </div>
  );
};

const mapStateToProps = state => {
  return { counter: state.counter };
};
const mapDispatchToProps = {
  add: actions.add,
  sub: actions.sub,
  increment: actions.increment,
  decrement: actions.decrement
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

# Options

## `actionPrefix`

In a large application action names can conflict with each other. Prefix actions with `{appName}/{reducerName}/` to avoid conflicts:

```javascript
const { reducer, actions } = createReducerActions(
  {
    like: state => state + 1,
    unlike: state => state - 1
  },
  0,
  { actionPrefix: "FACEBOOK/LIKE_REDUCER/" }
);
```

`actions.like()` will now dispatch an action with type `FACEBOOK/LIKE_REDUCER/like`.

## `mutable`

[Redux requires immutable changes to state](https://redux.js.org/faq/immutable-data#why-is-immutability-required).

Immutable changes in deeply nested objects are difficult to do, so add `mutable: true` to the `createReducerActions` options and you can make mutable changes to state that will be automatically turned into immutable changes:

```js
const initialState = {
  photos: { large: { url: "" } }
};
const { reducer, actions } = createReducerActions(
  {
    setLargePhotoUrl: (state, { payload: { url } }) => {
      // mutate the state!
      state.photos.large.url = url;
      // don't return anything
    }
  },
  initialState,
  { mutable: true }
);

const url = "https://i.imgur.com/4LR3f32.jpg";
const newState = reducer(initialState, actions.setLargePhotoUrl({ url }));
newState.photos.large.url; // "https://i.imgur.com/4LR3f32.jpg"
initialState.photos.large.url; // "" The initial state wasn't mutated =O
```

These mutating changes are done with the immutable helper library [immer](https://github.com/mweststrate/immer).

# Similar Projects

* https://github.com/kolodny/redux-create-reducer
* https://github.com/nrn/create-reducer
* https://github.com/pauldijou/redux-act
* https://github.com/infinitered/reduxsauce
* https://javascript.tutorialhorizon.com/2016/07/23/create-reducer-for-redux-applications/
* https://github.com/redux-utilities/redux-actions
* https://github.com/anish000kumar/redux-box
