// import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
// import { routerReducer } from 'react-router-redux';
import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

// import auth from './auth';
// import counter from './counter';
// import {reducer as form} from 'redux-form';
// import info from './info';
import player from './player';
import starred from './starred';
// import widgets from './widgets';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  // auth,
  // form,
  // multireducer: multireducer({
  //   counter1: counter,
  //   counter2: counter,
  //   counter3: counter
  // }),
  // info,
  player,
  starred,
  // widgets,
});
