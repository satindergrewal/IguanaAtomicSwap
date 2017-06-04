import React from 'react';
import { translate } from '../../translate/translate';
import {
  addCoin,
  toggleAddcoinModal,
  triggerToaster,
  shepherdGetCoinList,
  shepherdPostCoinList
} from '../../actions/actionCreators';
import Store from '../../store';

import RenderCoinSelectors from './render-coin-selectors.render';
import AddCoinRender from './addcoin.render';

class AddCoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      defaultCoinState: {
        selectedCoin: null,
        fullMode: {
          disabled: true,
          checked: false,
        },
        basiliskMode: {
          disabled: true,
          checked: false,
        },
        nativeMode: {
          disabled: true,
          checked: false,
        },
        mode: -2,
        syncOnly: false,
      },
      display: false,
      actionsMenu: false,
      modalClassName: 'hide',
    };
    this.activateCoin = this.activateCoin.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.activateAllCoins = this.activateAllCoins.bind(this);
    this.toggleActionsMenu = this.toggleActionsMenu.bind(this);
    this.saveCoinSelection = this.saveCoinSelection.bind(this);
    this.loadCoinSelection = this.loadCoinSelection.bind(this);
  }

  saveCoinSelection() {
    shepherdPostCoinList(this.state.coins)
    .then(function(json) {
      this.toggleActionsMenu();
    }.bind(this));
  }

  loadCoinSelection() {
    shepherdGetCoinList()
    .then(function(json) {
      if (json.msg !== 'error') {
        this.setState(Object.assign({}, this.state, {
          coins: json.result,
          actionsMenu: false,
        }));
      } else {
        Store.dispatch(triggerToaster(true, translate('TOASTR.SELECTION_NOT_FOUND'), translate('TOASTR.COIN_SELECTION'), 'info'));
      }
    }.bind(this));
  }

  toggleSyncOnlyMode(index) {
    let _coins = this.state.coins;

    _coins[index] = Object.assign({}, _coins[index], {
      syncOnly: !this.state.coins[index].syncOnly,
    });

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  toggleActionsMenu() {
    this.setState(Object.assign({}, this.state, {
      actionsMenu: !this.state.actionsMenu,
    }));
  }

  componentWillMount() {
    this.addNewItem();
  }

  componentWillReceiveProps(props) {
    if (props && props.display !== this.state.display) {
      this.setState(Object.assign({}, this.state, {
        display: props.display,
        modalClassName: props.display ? 'show fade' : 'show fade',
      }));

      setTimeout(() => {
        this.setState(Object.assign({}, this.state, {
          display: props.display,
          modalClassName: props.display ? 'show in' : 'hide',
        }));
      }, 100);
    }
  }

  updateSelectedCoin(e, index) {
    const coin = e.target.value.split('|');
    const defaultMode = coin[1];
    const modeToValue = {
      'full': 1,
      'basilisk': 0,
      'native': -1,
    };
    let _coins = this.state.coins;

    _coins[index] = {
      [e.target.name]: e.target.value,
      fullMode: {
        disabled: e.target.value.indexOf('full') > -1 ? false : true,
        checked: defaultMode === 'full' ? true : false,
      },
      basiliskMode: {
        disabled: e.target.value.indexOf('basilisk') > -1 ? false : true,
        checked: defaultMode === 'basilisk' ? true : false,
      },
      nativeMode: {
        disabled: e.target.value.indexOf('native') > -1 ? false : true,
        checked: defaultMode === 'native' ? true : false,
      },
      mode: modeToValue[defaultMode] !== undefined ? modeToValue[defaultMode] : -2,
      syncOnly: this.state.coins[index].syncOnly,
    }

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  updateSelectedMode(_value, index) {
    let _coins = this.state.coins;

    _coins[index] = {
      selectedCoin: _coins[index].selectedCoin,
      fullMode: {
        disabled: _coins[index].selectedCoin.indexOf('full') > -1 ? false : true,
        checked: _value === '1' ? true : false,
      },
      basiliskMode: {
        disabled: _coins[index].selectedCoin.indexOf('basilisk') > -1 ? false : true,
        checked: _value === '0' ? true : false,
      },
      nativeMode: {
        disabled: _coins[index].selectedCoin.indexOf('native') > -1 ? false : true,
        checked: _value === '-1' ? true : false,
      },
      mode: _value,
      syncOnly: this.state.coins[index].syncOnly,
    };

    this.setState(Object.assign({}, this.state, {
      coins: _coins
    }));
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.dismiss();
    }
  }

  activateCoin() {
    Store.dispatch(addCoin(
      this.state.coins[0].selectedCoin.split('|')[0],
      this.state.coins[0].mode,
      this.state.coins[0].syncOnly
    ));

    this.removeCoin();
    this.addNewItem();

    Store.dispatch(toggleAddcoinModal(false, false));
  }

  dismiss() {
    Store.dispatch(toggleAddcoinModal(false, false));
  }

  addNewItem() {
    let _coins = this.state.coins;
    _coins.push(this.state.defaultCoinState);

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  removeCoin(index) {
    let _coins = this.state.coins;
    _coins.splice(index, 1);

    this.setState(Object.assign({}, this.state, {
      coins: _coins,
    }));
  }

  hasMoreThanOneCoin() {
    return this.state.coins.length > 1;
  }

  activateAllCoins() {
    Store.dispatch(addCoin(
      this.state.coins[0].selectedCoin.split('|')[0],
      this.state.coins[0].mode,
      this.state.coins[0].syncOnly
    ));

    for (let i = 1; i < this.state.coins.length; i++) {
      const _item = this.state.coins[i];

      setTimeout(() => {
        Store.dispatch(addCoin(
          _item.selectedCoin.split('|')[0],
          _item.mode,
          _item.syncOnly
        ));

        if (i === this.state.coins.length - 1) {
          let _coins = [];
          _coins.push(this.state.defaultCoinState);

          this.setState(Object.assign({}, this.state, {
            coins: _coins,
          }));

          Store.dispatch(toggleAddcoinModal(false, false));
        }
      }, 2000 * i);
    }
  }

  renderCoinSelectors() {
    let items = [];

    for (let i = 0; i < this.state.coins.length; i++) {
      const _item = this.state.coins[i];
      const _coin = _item.selectedCoin || '';

      items.push(
        RenderCoinSelectors.call(this, _item, _coin, i)
      );
    }

    return items;
  }

  render() {
    return (
      AddCoinRender.call(this)
    );
  }
}

export default AddCoin;
