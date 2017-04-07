import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { AddCoin } from './addcoin';
import { toaster } from './toaster';
import { Main } from './main';
import { Dashboard } from './dashboard';
import { ActiveCoin } from './activeCoin';
import { Atomic } from './atomic';
import { Settings } from './settings';

const rootReducer = combineReducers({
  AddCoin,
  toaster,
  Main,
  Dashboard,
  ActiveCoin,
  Atomic,
  Settings,
  routing: routerReducer,
});

export default rootReducer;
