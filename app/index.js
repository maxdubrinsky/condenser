import React from 'react';
import {render} from 'react-dom';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import condenserApp from './reducers';
import Condenser from './components/Condenser';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  condenserApp,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware
    )
  )
);

render(
  <Provider store={store}>
    <Condenser />
  </Provider>,
  document.getElementById('app')
);
