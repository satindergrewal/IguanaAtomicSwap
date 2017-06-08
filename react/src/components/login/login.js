import React from 'react';
import { translate } from '../../translate/translate';
import {
  toggleAddcoinModal,
  iguanaWalletPassphrase,
  iguanaActiveHandle,
  startInterval,
  stopInterval,
  getDexCoins,
  toggleSyncOnlyModal,
  getSyncOnlyForks,
  createNewWallet
} from '../../actions/actionCreators';
import Store from '../../store';
import { PassPhraseGenerator } from '../../util/crypto/passphrasegenerator';

import SwallModalRender from './swall-modal.render';
import LoginRender from './login.render';

const IGUNA_ACTIVE_HANDLE_TIMEOUT = 3000;
const IGUNA_ACTIVE_COINS_TIMEOUT = 10000;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      activeLoginSection: 'activateCoin',
      loginPassphrase: null,
      seedInputVisibility: false,
      bitsOption: 256,
      randomSeed: PassPhraseGenerator.generatePassPhrase(256),
      randomSeedConfirm: '',
      isSeedConfirmError: false,
      displaySeedBackupModal: false,
    };
    this.toggleActivateCoinForm = this.toggleActivateCoinForm.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.loginSeed = this.loginSeed.bind(this);
    this.toggleSeedInputVisibility = this.toggleSeedInputVisibility.bind(this);
    this.handleRegisterWallet = this.handleRegisterWallet.bind(this);
    this.openSyncOnlyModal = this.openSyncOnlyModal.bind(this);
    this.toggleSeedBackupModal = this.toggleSeedBackupModal.bind(this);
    this.execWalletCreate = this.execWalletCreate.bind(this);
  }

  openSyncOnlyModal() {
    Store.dispatch(getSyncOnlyForks());

    const _iguanaActiveHandle = setInterval(() => {
      Store.dispatch(getSyncOnlyForks());
    }, IGUNA_ACTIVE_HANDLE_TIMEOUT);
    Store.dispatch(startInterval('syncOnly', _iguanaActiveHandle));

    Store.dispatch(toggleSyncOnlyModal(true));
  }

  componentDidMount() {
    Store.dispatch(iguanaActiveHandle(true));
  }

  toggleSeedInputVisibility() {
    this.setState({
      seedInputVisibility: !this.state.seedInputVisibility,
    });
  }

  generateNewSeed(bits) {
    this.setState(Object.assign({}, this.state, {
      randomSeed: PassPhraseGenerator.generatePassPhrase(bits),
      bitsOption: bits,
    }));
  }

  componentWillReceiveProps(props) {
    if (props &&
        props.Main &&
        props.Main.isLoggedIn) {
      this.setState({
        display: false,
      });
    }

    if (props &&
        props.Main &&
        !props.Main.isLoggedIn) {
      this.setState({
        display: true,
      });

      if (!this.props.Interval.interval.activeCoins) {
        const _iguanaActiveCoins = setInterval(() => {
          Store.dispatch(getDexCoins());
        }, IGUNA_ACTIVE_COINS_TIMEOUT);
        Store.dispatch(startInterval('activeCoins', _iguanaActiveCoins));
      }

      document.body.className = 'page-login layout-full page-dark';
    }

    if (this.state.activeLoginSection !== 'signup') {
      if (props &&
          props.Main &&
          props.Main.activeCoins) {
        this.setState({
          activeLoginSection: 'login',
        });
      } else {
        this.setState({
          activeLoginSection: 'activateCoin',
        });
      }
    }
  }

  toggleActivateCoinForm() {
    Store.dispatch(toggleAddcoinModal(true, false));
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
      isSeedConfirmError: false,
    });
  }

  loginSeed() {
    Store.dispatch(iguanaWalletPassphrase(this.state.loginPassphrase));
  }

  updateActiveLoginSection(name) {
    this.setState({
      activeLoginSection: name,
    });
  }

  execWalletCreate() {
    Store.dispatch(createNewWallet(this.state.randomSeedConfirm, this.props.Dashboard.activeHandle));

    this.setState({
      activeLoginSection: 'activateCoin',
      displaySeedBackupModal: false,
      isSeedConfirmError: false,
    });
  }

  handleRegisterWallet() {
    if (this.state.randomSeed === this.state.randomSeedConfirm) {
      this.toggleSeedBackupModal();
    } else {
      this.setState({
        isSeedConfirmError: true,
      });
    }
  }

  handleKeydown(e) {
    if (e.key === 'Enter') {
      this.loginSeed();
    }
  }

  toggleSeedBackupModal() {
    this.setState(Object.assign({}, this.state, {
      displaySeedBackupModal: !this.state.displaySeedBackupModal,
    }));
  }

  renderSwallModal() {
    if (this.state.displaySeedBackupModal) {
      return SwallModalRender.call(this);
    }

    return null;
  }

  render() {
    if ((this.state && this.state.display) || !this.props.Main) {
      return LoginRender.call(this);
    }

    return null;
  }
}

export default Login;
