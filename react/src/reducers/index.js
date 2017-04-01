import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { AddCoin } from './addcoin';
import { toaster } from './toaster';
//import { loader } from './loader';

const rootReducer = combineReducers({
  AddCoin,
  toaster,
  //loader,
  routing: routerReducer,
});

export default rootReducer;
