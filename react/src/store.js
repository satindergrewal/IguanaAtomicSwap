import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

const loggerMiddleware = createLogger();

const defaultState = {
  toaster: null,
  AddCoin: null,
};

const enhancers = compose(window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(
  rootReducer,
  defaultState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

const requireIndexReducer = require('./reducers/index').default;

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = requireIndexReducer;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
