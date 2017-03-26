import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//import { coins } from './coins';
import { toaster } from './toaster';
//import { loader } from './loader';

const rootReducer = combineReducers({
  //coins,
  toaster,
  //loader,
  routing: routerReducer,
});

export default rootReducer;
