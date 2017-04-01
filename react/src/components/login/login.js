import React from 'react';
import { translate } from '../../translate/translate';
import { toggleAddcoinModal } from '../../actions/actionCreators';
import Store from '../../store';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      ieWarning: false,
      login: false,
      signup: false,
      activateCoin: true,
    };
    this.toggleActivateCoinForm = this.toggleActivateCoinForm.bind(this);
  }

  toggleActivateCoinForm() {
    Store.dispatch(toggleAddcoinModal(true, false));
  }

  render() {
    return (
      <div id="wallet-login" className={this.state.display ? 'show' : 'hide'}>
        <div className="page animsition vertical-align text-center fade-in" data-animsition-in="fade-in" data-animsition-out="fade-out">
          <div className="page-content vertical-align-middle">
            <div className="brand">
              <img className="brand-img" src="assets/images/easydex-logo-big.png" alt="SuperNET Iguana" />
            </div>

            <div id="section-ie-warning" className={this.state.ieWarning ? 'show' : 'hide'}>
              <div className="panel">
                <div className="panel-heading">
                  <h3 className="panel-title">{translate('INDEX.UNSUPPORTED_BROWSER')}</h3>
                </div>
                <div className="alert alert-danger alert-dismissible" role="alert">
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span className="sr-only">{translate('INDEX.CLOSE')}</span>
                  </button>
                  {translate('INDEX.IE_UNSUPPORTED')}
                </div>
                <div className="panel-body">
                  <p style={{ color: '#424242' }}>
                    {translate('INDEX.PLEASE_USE')} <a href="https://www.google.com/chrome/">Google Chrome</a> {translate('INDEX.OR')} <a href="https://www.firefox.com">Mozilla FireFox</a> {translate('INDEX.TO_USE')} EasyDEX-GUI. {translate('INDEX.PLEASE_CLICK_ON')}.
                  </p>
                  <div className="col-sm-6 col-xs-6">
                    <a href="https://www.google.com/chrome/"><img className="brand-img" src="assets/images/browsers/chrome.png" alt="Google Chrome" /></a>
                  </div>
                  <div className="col-sm-6 col-xs-6">
                    <a href="https://www.firefox.com"><img className="brand-img" src="assets/images/browsers/firefox.png" alt="Mozilla FireFox" /></a>
                  </div>
                </div>
              </div>
            </div>

            <div id="section-login" className={this.state.login ? 'show' : 'hide'}>
              <h4 style={{ color: '#fff' }} id="login-welcome">{translate('INDEX.WELCOME_LOGIN')}</h4>
              <form className="login-form" autoComplete="off">
                <div className="form-group form-material floating">
                  <input type="password" className="form-control" name="password" id="password" />
                  <label className="floating-label" htmlFor="inputPassword">{translate('INDEX.WALLET_SEED')}</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block" id="loginbtn">{translate('INDEX.SIGN_IN')}</button>
                <div className="form-group form-material floating">
                  <button className="btn btn-lg btn-flat btn-block waves-effect" id="register-btn">{translate('INDEX.CREATE_WALLET')}</button>
                  <button className="btn btn-lg btn-flat btn-block waves-effect" id="logint-another-wallet">{translate('INDEX.LOGIN_ANOTHER_WALLET')}</button>
                </div>
              </form>
            </div>

            <div id="section-login-addcoin-btn" className={this.state.activateCoin ? 'show' : 'hide'}>
              <h4 style={{ color: '#fff' }} id="login-welcome">{translate('INDEX.WELCOME_PLEASE_ADD')}</h4>
              <div className="form-group form-material floating" style={{width: '540px', margin: '30px 0'}}>
                <button className="btn btn-lg btn-primary btn-block ladda-button" id="start-coin-login" role="menuitem" data-edexcoinmenu="COIN" data-target="#AddCoinDilogModel-login" data-toggle="modal" data-style="expand-left" data-plugin="ladda" onClick={this.toggleActivateCoinForm}><span className="ladda-label">{translate('INDEX.ACTIVATE_COIN')}</span></button>
              </div>
            </div>

            <div id="section-register" className={this.state.signup ? 'show' : 'hide'}>
              <form className="register-form" role="form" autoComplete="off">
                <h4 className="hint" style={{ color: '#fff' }}>
                  {translate('INDEX.SELECT_SEED_TYPE')}:
                </h4>
                <div className="form-group form-material floating">
                  <div className="radio-custom radio-default radio-inline">
                    <input type="radio" id="PassPhraseOptionsIguana" value="PassPhraseOptionsIguana" name="PassPhraseOptions" checked="" />
                    <label htmlFor="PassPhraseOptionsIguana">Iguana (256 bits)</label>
                  </div>
                  <div className="radio-custom radio-default radio-inline">
                    <input type="radio" id="PassPhraseOptionsWaves" value="PassPhraseOptionsWaves" name="PassPhraseOptions" />
                    <label htmlFor="PassPhraseOptionsWaves">Waves</label>
                  </div>
                  <div className="radio-custom radio-default radio-inline">
                    <input type="radio" id="PassPhraseOptionsNXT" value="PassPhraseOptionsNXT" name="PassPhraseOptions" />
                    <label htmlFor="PassPhraseOptionsNXT">NXT</label>
                  </div>
                </div>
                <div className="form-group form-material floating">
                  <textarea className="form-control placeholder-no-fix" type="text" placeholder="" name="walletseed" id="walletseed" style={{ height: '100px' }}></textarea>
                  <label className="floating-label" htmlFor="walletseed">{translate('INDEX.WALLET_SEED')}</label>
                </div>
                <div className="form-group form-material floating">
                  <textarea className="form-control placeholder-no-fix" type="text" placeholder="" name="rwalletseed" id="rwalletseed" style={{ height: '100px' }}></textarea>
                  <label className="floating-label" htmlFor="rwalletseed">{translate('INDEX.CONFIRM_SEED')}</label>
                </div>
                <button type="submit" id="register-submit-btn" className="btn btn-primary btn-block">{translate('INDEX.REGISTER')}</button>
                <div className="form-group form-material floating">
                  <button className="btn btn-lg btn-flat btn-block waves-effect" id="register-back-btn">{translate('INDEX.BACK_TO_LOGIN')}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
