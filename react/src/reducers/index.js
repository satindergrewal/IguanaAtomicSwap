import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { AddCoin } from './addcoin';
import { toaster } from './toaster';
import { Main } from './main';
//import { loader } from './loader';

const rootReducer = combineReducers({
  AddCoin,
  toaster,
  Main,
  routing: routerReducer,
});

export default rootReducer;
