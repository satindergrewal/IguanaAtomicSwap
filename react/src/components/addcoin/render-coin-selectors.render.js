import React from 'react';
import { translate } from '../../translate/translate';
import AddCoinOptionsCrypto from '../addcoin/addcoinOptionsCrypto';
import AddCoinOptionsAC from '../addcoin/addcoinOptionsAC';
import AddCoinOptionsACFiat from '../addcoin/addcoinOptionsACFiat';


const RenderCoinSelectors = function(item, coin, i) {
  return (
    <div className={ this.hasMoreThanOneCoin() ? 'multi' : 'single' } key={ `add-coin-${i}` }>
      <div className="col-sm-8">
        <div className="form-group">
          <select
            className="form-control form-material"
            name="selectedCoin"
            id="addcoin_select_coin_mdl_options-login"
            value={ coin }
            onChange={ (event) => this.updateSelectedCoin(event, i) }
            autoFocus>
            <option>{ translate('INDEX.SELECT') }</option>
            <AddCoinOptionsCrypto />
            <AddCoinOptionsAC />
            <AddCoinOptionsACFiat />
          </select>
        </div>
      </div>
      <div className={ this.hasMoreThanOneCoin() ? 'hide' : 'col-sm-4' }>
        <button
          type="button"
          className="btn btn-primary mdl_addcoin_done_btn-login"
          id="mdl_addcoin_done_btn-login"
          onClick={ () => this.activateCoin(i) }
          disabled={ item.mode === -2 }>{ translate('INDEX.ACTIVATE_COIN') }</button>
      </div>
      <div className="col-sm-12 text-center">
        <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl-login">
          <input
            type="radio"
            className="to-labelauty labelauty"
            name={ `mode-${i}` }
            id={ `addcoin_mdl_full_mode_login-${i}` }
            disabled={ item.fullMode.disabled }
            checked={ item.fullMode.checked }/>
          <label
            htmlFor={ `addcoin_mdl_full_mode_login-${i}` }
            onClick={ () => this.updateSelectedMode('1', i) }
            style={{pointerEvents: item.fullMode.disabled ? 'none' : 'all'}}>
                <span
                  className="labelauty-unchecked-image"
                  style={{display: item.fullMode.checked ? 'none' : 'inline-block'}}></span>
            <span
              className="labelauty-unchecked"
              style={{display: item.fullMode.checked ? 'none' : 'inline-block'}}>{ translate('INDEX.FULL_MODE') }</span>
            <span
              className="labelauty-checked-image"
              style={{display: item.fullMode.checked ? 'inline-block' : 'none'}}></span>
            <span
              className="labelauty-checked"
              style={{display: item.fullMode.checked ? 'inline-block' : 'none'}}>{ translate('INDEX.FULL_MODE') }</span>
          </label>
        </div>
        <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl-login">
          <input
            type="radio"
            className="to-labelauty labelauty"
            name={ `mode-${i}` }
            id={ `addcoin_mdl_basilisk_mode_login-${i}` }
            disabled={ item.basiliskMode.disabled }
            checked={ item.basiliskMode.checked }/>
          <label
            htmlFor={ `addcoin_mdl_basilisk_mode_login-${i}` }
            onClick={ () => this.updateSelectedMode('0', i) }
            style={{pointerEvents: item.basiliskMode.disabled ? 'none' : 'all'}}>
                <span
                  className="labelauty-unchecked-image"
                  style={{display: item.basiliskMode.checked ? 'none' : 'inline-block'}}></span>
            <span
              className="labelauty-unchecked"
              style={{display: item.basiliskMode.checked ? 'none' : 'inline-block'}}>{ translate('INDEX.BASILISK_MODE') }</span>
            <span
              className="labelauty-checked-image"
              style={{display: item.basiliskMode.checked ? 'inline-block' : 'none'}}></span>
            <span
              className="labelauty-checked"
              style={{display: item.basiliskMode.checked ? 'inline-block' : 'none'}}>{ translate('INDEX.BASILISK_MODE') }</span>
          </label>
        </div>
        <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12 style-addcoin-lbl-mdl-login">
          <input
            type="radio"
            className="to-labelauty labelauty"
            name={ `mode-${i}` }
            id={ `addcoin_mdl_native_mode_login-${i}` }
            disabled={ item.nativeMode.disabled }
            checked={ item.nativeMode.checked }/>
          <label
            htmlFor={ `addcoin_mdl_native_mode_login-${i}` }
            onClick={ () => this.updateSelectedMode('-1', i) }
            style={{pointerEvents: item.nativeMode.disabled ? 'none' : 'all'}}>
                <span
                  className="labelauty-unchecked-image"
                  style={{display: item.nativeMode.checked ? 'none' : 'inline-block'}}></span>
            <span
              className="labelauty-unchecked"
              style={{display: item.nativeMode.checked ? 'none' : 'inline-block'}}>{ translate('INDEX.NATIVE_MODE') }</span>
            <span
              className="labelauty-checked-image"
              style={{display: item.nativeMode.checked ? 'inline-block' : 'none'}}></span>
            <span
              className="labelauty-checked"
              style={{display: item.nativeMode.checked ? 'inline-block' : 'none'}}>{ translate('INDEX.NATIVE_MODE') }</span>
          </label>
        </div>
      </div>
      <div className={ this.hasMoreThanOneCoin() && i !== 0 ? 'col-sm-1' : 'hide' }>
        <button
          type="button"
          className="btn btn-primary mdl_addcoin_done_btn-login"
          id="mdl_addcoin_done_btn-login"
          onClick={ () => this.removeCoin(i) }>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
      <div className={ item.mode === '1' || item.mode === 1 ? 'col-sm-12' : 'hide' }>
        <div className="toggle-box padding-top-3 padding-bottom-10">
              <span className="pointer">
                <label className="switch">
                  <input type="checkbox" checked={ item.syncOnly }/>
                  <div className="slider" onClick={ () => this.toggleSyncOnlyMode(i) }></div>
                </label>
                <div className="toggle-label"
                     onClick={ () => this.toggleSyncOnlyMode(i) }>{ translate('ADD_COIN.SYNC_ONLY') }</div>
              </span>
        </div>
      </div>
    </div>
  )
};
export default RenderCoinSelectors;