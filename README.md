# Getting Started

## Installation

## Usage

```jsx
// ducks/counter.js
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

export default reducer;

// store.js
import { combineReducers, createStore } from "redux";
import counter from "./ducks/counter";
const rootReducer = combineReducers({ counter });
// create and export store

// Counter.js
import React from "react";
import * as counterActions from "./ducks/counter";
// create Counter with mapDispatchToProps of some counterActions
```

## Prior Art

* https://github.com/kolodny/redux-create-reducer
* https://github.com/nrn/create-reducer
* https://github.com/pauldijou/redux-act
* https://github.com/infinitered/reduxsauce
* https://javascript.tutorialhorizon.com/2016/07/23/create-reducer-for-redux-applications/
* https://github.com/redux-utilities/redux-actions

## Notes

[Dan Abramov doesn't like one-to-one action creator to reducer modifications](https://twitter.com/dan_abramov/status/738405796770353152), because you don't even need redux to do that.
