import React from 'react';
import { translate } from '../../translate/translate';
import { addCoin, toggleAddcoinModal } from '../../actions/actionCreators';
import Store from '../../store';

class AddCoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      display: false,
    };
    this.updateSelectedCoin = this.updateSelectedCoin.bind(this);
    this.updateSelectedMode = this.updateSelectedMode.bind(this);
    this.setNativeMode = this.setNativeMode.bind(this);
    this.setBasiliskMode = this.setBasiliskMode.bind(this);
    this.setFullMode = this.setFullMode.bind(this);
    this.activateCoin = this.activateCoin.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props) {
      this.setState(Object.assign({}, this.state, {
        display: props.display,
      }));
    }
  }

  updateSelectedCoin(e) {
    const coin = e.target.value.split('|');
    const defaultMode = coin[1];
    const modeToValue = {
      'full': 1,
      'basilisk': 0,
      'native': -1,
    };

    this.setState(Object.assign({}, this.state, {
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
    }));
  }

  updateSelectedMode(_value) {
    this.setState(Object.assign({}, this.state, {
      fullMode: {
        ...this.state.fullMode,
        checked: _value === '1' ? true : false,
      },
      basiliskMode: {
        ...this.state.basiliskMode,
        checked: _value === '0' ? true : false,
      },
      nativeMode: {
        ...this.state.nativeMode,
        checked: _value === '-1' ? true : false,
      },
      mode: _value,
    }));
  }

  setNativeMode() {
    this.updateSelectedMode('-1');
  }

  setBasiliskMode() {
    this.updateSelectedMode('0');
  }

  setFullMode() {
    this.updateSelectedMode('1');
  }

  /*handleForm(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({
      mode: '',
      selectedCoin: null,
    });
  }*/

  activateCoin() {
    Store.dispatch(addCoin(this.state.selectedCoin.split('|')[0], this.state.mode));
  }

  dismiss() {
    Store.dispatch(toggleAddcoinModal(false, false));
  }

  render() {
    return (
      <div>
        <div className={'modal modal-3d-sign add-coin-modal ' + (this.state.display ? 'show in' : 'fade hide')} id="AddCoinDilogModel-login" aria-hidden="true" aria-labelledby="AddCoinDilogModel-login" role="dialog" tabIndex="-1">
          <div className="modal-dialog modal-center modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-orange-a400 wallet-send-header">
                <button type="button" className="close white" data-dismiss="modal" aria-label="Close" onClick={this.dismiss}>
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title white">{translate('INDEX.SELECT_A_COIN')}</h4>
              </div>
              <div className="modal-body">
                <div className="col-sm-8">
                  <div className="form-group">
                    <select className="form-control form-material" name="selectedCoin" id="addcoin_select_coin_mdl_options-login" onChange={this.updateSelectedCoin}>
                      <option>{translate('INDEX.SELECT')}</option>
                        <optgroup label="Crypto Currencies">
                          <option value="ANC|full" data-full-mode="true">AnonCoin (ANC)</option>
                          <option value="BTC|full|basilisk">Bitcoin (BTC)</option>
                          <option value="BTCD|full">BitcoinDark (BTCD)</option>
                          <option value="BTM|full">Bitmark (BTM)</option>
                          <option value="CARB|full">Carboncoin (CARB)</option>
                          <option value="DGB|full">Digibyte (DGB)</option>
                          <option value="DOGE|full">Dogecoin (DOGE)</option>
                          <option value="FRK|full">Franko (FRK)</option>
                          <option value="GMC|full">Gamerscoin (GMC)</option>
                          <option value="KMD|basilisk|native">Komodo (KMD)</option>
                          <option value="LTC|full">Litecoin (LTC)</option>
                          <option value="MZC|full">MazaCoin (MZC)</option>
                          <option value="SYS|full">SysCoin (SYS)</option>
                          <option value="UNO|full">Unobtanium (UNO)</option>
                          <option value="ZEC|full">Zcash (ZEC)</option>
                          <option value="ZET|full">Zetacoin (ZET)</option>
                        </optgroup>
                        <optgroup label="Assetchains">
                          <option value="BET|basilisk|native">BET (BET)</option>
                          <option value="BOTS|basilisk|native">BOTS (BOTS)</option>
                          <option value="CEAL|basilisk|native">CEAL NET (CEAL)</option>
                          <option value="CRYPTO|basilisk|native">CRYPTO (CRYPTO)</option>
                          <option value="HOD|basilisk|native">HODL (HODL)</option>
                          <option value="DEX|basilisk|native">InstantDEX (DEX)</option>
                          <option value="JUMBLR|basilisk|native">JUMBLR (JUMBLR)</option>
                          <option value="KV|basilisk|native">KV (KV)</option>
                          <option value="MGW|basilisk|native">MultiGateway (MGW)</option>
                          <option value="MVP|basilisk|native">MVP Lineup (MVP)</option>
                          <option value="PANGEA|basilisk|native">PANGEA (PANGEA)</option>
                          <option value="REVS|basilisk|native">REVS (REVS)</option>
                          <option value="SHARK|basilisk|native">SHARK (SHARK)</option>
                          <option value="MESH|basilisk|native">SpaceMesh (MESH)</option>
                          <option value="SUPERNET|basilisk|native">SUPERNET (SUPERNET)</option>
                          <option value="WIRELESS|basilisk|native">WIRELESS (WIRELESS)</option>
                        </optgroup>
                        <optgroup label="Fiat Currencies">
                          <option value="AUD|basilisk|native">Australian Dollar (AUD)</option>
                          <option value="BRL|basilisk|native">Brazilian Real (BRL)</option>
                          <option value="GBP|basilisk|native">British Pound (GBP)</option>
                          <option value="BGN|basilisk|native">Bulgarian Lev (BGN)</option>
                          <option value="CAD|basilisk|native">Canadian Dollar (CAD)</option>
                          <option value="HRK|basilisk|native">Croatian Kuna (HRK)</option>
                          <option value="CZK|basilisk|native">Czech Koruna (CZK)</option>
                          <option value="CNY|basilisk|native">Chinese Yuan (CNY)</option>
                          <option value="DKK|basilisk|native">Danish Krone (DKK)</option>
                          <option value="EUR|basilisk|native">Euro (EUR)</option>
                          <option value="HKD|basilisk|native">Hong Kong Dollar (HKD)</option>
                          <option value="HUF|basilisk|native">Hungarian Forint (HUF)</option>
                          <option value="INR|basilisk|native">Indian Rupee (INR)</option>
                          <option value="IDR|basilisk|native">Indonesian Rupiah (IDR)</option>
                          <option value="ILS|basilisk|native">Israeli Shekel (ILS)</option>
                          <option value="JPY|basilisk|native">Japanese Yen (JPY)</option>
                          <option value="KRW|basilisk|native">Korean Won (KRW)</option>
                          <option value="MYR|basilisk|native">Malaysian Ringgit (MYR)</option>
                          <option value="MXN|basilisk|native">Mexican peso (MXN)</option>
                          <option value="NZD|basilisk|native">New Zealand Dollar (NZD)</option>
                          <option value="NOK|basilisk|native">Norwegian Krone (NOK)</option>
                          <option value="PHP|basilisk|native">Philippine Peso (PHP)</option>
                          <option value="PLN|basilisk|native">Polish Zloty (PLN)</option>
                          <option value="RON|basilisk|native">Romanian Leu (RON)</option>
                          <option value="RUB|basilisk|native">Russian Ruble (RUB)</option>
                          <option value="SGD|basilisk|native">Singapore Dollar (SGD)</option>
                          <option value="ZAR|basilisk|native">South African Rand (ZAR)</option>
                          <option value="SEK|basilisk|native">Swedish Krona (SEK)</option>
                          <option value="CHF|basilisk|native">Swiss Franc (CHF)</option>
                          <option value="THB|basilisk|native">Thai Baht (THB)</option>
                          <option value="TRY|basilisk|native">Turkish Lira (TRY)</option>
                          <option value="USD|basilisk|native">US Dollar (USD)</option>
                        </optgroup>
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <button type="button" className="btn btn-primary mdl_addcoin_done_btn-login" data-toggle="modal" data-dismiss="modal" id="mdl_addcoin_done_btn-login" onClick={this.activateCoin} disabled={this.state.mode === -2 }>{translate('INDEX.ACTIVATE_COIN')}</button>
                </div>
                <div className="col-sm-12 text-center">
                  <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl-login">
                    <input type="radio" className="to-labelauty labelauty" name="mode" id="addcoin_mdl_full_mode_login" disabled={this.state.fullMode.disabled} checked={this.state.fullMode.checked} />
                    <label htmlFor="addcoin_mdl_full_mode_login" onClick={this.setFullMode} style={{ pointerEvents: this.state.fullMode.disabled ? 'none' : 'all' }}>
                      <span className="labelauty-unchecked-image" style={{ display: this.state.fullMode.checked ? 'none' : 'inline-block' }}></span>
                      <span className="labelauty-unchecked" style={{ display: this.state.fullMode.checked ? 'none' : 'inline-block' }}>{translate('INDEX.FULL_MODE')}</span>
                      <span className="labelauty-checked-image" style={{ display: this.state.fullMode.checked ? 'inline-block' : 'none' }}></span>
                      <span className="labelauty-checked" style={{ display: this.state.fullMode.checked ? 'inline-block' : 'none' }}>{translate('INDEX.FULL_MODE')}</span>
                    </label>
                  </div>
                  <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl-login">
                    <input type="radio" className="to-labelauty labelauty" name="mode" id="addcoin_mdl_basilisk_mode_login" disabled={this.state.basiliskMode.disabled} checked={this.state.basiliskMode.checked} />
                    <label htmlFor="addcoin_mdl_basilisk_mode_login" onClick={this.setBasiliskMode} style={{ pointerEvents: this.state.basiliskMode.disabled ? 'none' : 'all' }}>
                      <span className="labelauty-unchecked-image" style={{ display: this.state.basiliskMode.checked ? 'none' : 'inline-block' }}></span>
                      <span className="labelauty-unchecked" style={{ display: this.state.basiliskMode.checked ? 'none' : 'inline-block' }}>{translate('INDEX.BASILISK_MODE')}</span>
                      <span className="labelauty-checked-image" style={{ display: this.state.basiliskMode.checked ? 'inline-block' : 'none' }}></span>
                      <span className="labelauty-checked" style={{ display: this.state.basiliskMode.checked ? 'inline-block' : 'none' }}>{translate('INDEX.BASILISK_MODE')}</span>
                    </label>
                  </div>
                  <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12 style-addcoin-lbl-mdl-login">
                    <input type="radio" className="to-labelauty labelauty" name="mode" id="addcoin_mdl_native_mode_login" disabled={this.state.nativeMode.disabled} checked={this.state.nativeMode.checked} />
                    <label htmlFor="addcoin_mdl_native_mode_login" onClick={this.setNativeMode} style={{ pointerEvents: this.state.nativeMode.disabled ? 'none' : 'all' }}>
                      <span className="labelauty-unchecked-image" style={{ display: this.state.nativeMode.checked ? 'none' : 'inline-block' }}></span>
                      <span className="labelauty-unchecked" style={{ display: this.state.nativeMode.checked ? 'none' : 'inline-block' }}>{translate('INDEX.NATIVE_MODE')}</span>
                      <span className="labelauty-checked-image" style={{ display: this.state.nativeMode.checked ? 'inline-block' : 'none' }}></span>
                      <span className="labelauty-checked" style={{ display: this.state.nativeMode.checked ? 'inline-block' : 'none' }}>{translate('INDEX.NATIVE_MODE')}</span>
                    </label>
                  </div>
                </div>
                <div className="col-sm-12">
                  <p>
                    <strong>{translate('INDEX.FULL_MODE')}:</strong> {translate('INDEX.FULL_MODE_DESC')}
                  </p>
                  <p>
                    <strong>{translate('INDEX.BASILISK_MODE')}:</strong> {translate('INDEX.BASILISK_MODE_DESC')}
                  </p>
                  <p>
                    <strong>{translate('INDEX.NATIVE_MODE')}:</strong> {translate('INDEX.NATIVE_MODE_DESC1')} <strong>Komodo Daemon</strong> {translate('INDEX.NATIVE_MODE_DESC2')} <i>Iguana Daemon</i> {translate('INDEX.NATIVE_MODE_DESC3')}.
                  </p>
                  <div className="alert alert-icon alert-primary" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <i className="icon md-info-outline" aria-hidden="true"></i> <strong>{translate('INDEX.NATIVE_MODE')}</strong> {translate('INDEX.NATIVE_MODE_DESC4')} <strong>{translate('INDEX.NATIVE_MODE_DESC5')}</strong>, <i>{translate('INDEX.NATIVE_MODE_DESC5')}</i>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'modal-backdrop ' + (this.state.display ? 'show in' : 'fade hide')}></div>
      </div>
    );
  }
}

export default AddCoin;
