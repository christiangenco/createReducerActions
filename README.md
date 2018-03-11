# createReducerActions

[![build status](https://img.shields.io/travis/acdlite/redux-actions/master.svg?style=flat-square)](https://travis-ci.org/acdlite/redux-actions)

[![NPM](https://nodei.co/npm/redux-actions.png?downloads=true)](https://nodei.co/npm/redux-actions/)

[`createReducerActions`]() is a single function that creates a redux reducer and linked action creators, like this:

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
```

or

```bash
$ yarn add create-reducer-actions
```

## Usage

```jsx
// ./redux/counter.js
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

// ./store.js
import { createStore, combineReducers } from "redux";

import { reducer as counter } from "./redux/counter";

const rootReducer = combineReducers({ counter });
const store = createStore(rootReducer);

export default store;


// ./Counter.js
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

```js
const initialState = {
  photos: { large: { url: "" } }
};
const { reducer, actions } = createReducerActions(
  {
    setLargePhotoUrl: (state, { payload: { url } }) => {
      // mutate the state!
      state.photos.large.url = url;
    }
  },
  initialState,
  { mutable: true }
);

const url = "https://i.imgur.com/4LR3f32.jpg";
const newState = reducer(initialState, actions.setLargePhotoUrl({ url }));
newState.photos.large.url; // "https://i.imgur.com/4LR3f32.jpg"
initialState.photos.large.url; // "" The initial state wasn't mutated!
```

# Similar Projects

* https://github.com/kolodny/redux-create-reducer
* https://github.com/nrn/create-reducer
* https://github.com/pauldijou/redux-act
* https://github.com/infinitered/reduxsauce
* https://javascript.tutorialhorizon.com/2016/07/23/create-reducer-for-redux-applications/
* https://github.com/redux-utilities/redux-actions
* https://github.com/anish000kumar/redux-box

# Motivation

[Dan Abramov doesn't like one-to-one action creator to reducer modifications](https://twitter.com/dan_abramov/status/738405796770353152) like this because you don't even need redux to do that.
