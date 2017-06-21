import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { AddCoin } from './addcoin';
import { toaster } from './toaster';
import { Main } from './main';
import { Dashboard } from './dashboard';
import { ActiveCoin } from './activeCoin';
import { Atomic } from './atomic';
import { Settings } from './settings';
import { Interval } from './interval';
import { SyncOnly } from './syncOnly';
import { Errors } from './errors';

const rootReducer = combineReducers({
  AddCoin,
  toaster,
  Main,
  Dashboard,
  ActiveCoin,
  Atomic,
  Settings,
  Interval,
  SyncOnly,
  Errors,
  routing: routerReducer,
});

export default rootReducer;
