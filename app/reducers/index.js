import {Map} from 'immutable';
import {combineReducers} from 'redux-immutable';
import header from './header';
import results from './results';

const condenserApp = combineReducers(
  {header, results}
);

export default condenserApp;
