import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/app/app';
//import Wallets from './components/wallets/wallets';
//import AtomicExplorer from './components/atomicExplorer/AtomicExplorer';
//import EasyDEX from './components/easyDex/easyDex';
//import Jumblr from './components/jumblr/jumblr';
//import Settings from './components/settings/settings';
//import About from './components/settings/about';

import './styles/index.scss';

//<IndexRoute component={Wallets} />
//<Route path="/atomicexplorer" component={AtomicExplorer} />
//<Route path="/easydex" component={EasyDEX} />
//<Route path="/jumblr" component={Jumblr} />
//<Route path="/settings" component={Settings} />
//<Route path="/about" component={About} />

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  render(
    router,
    document.getElementById('app'),
  );
});
