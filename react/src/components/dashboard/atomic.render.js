import React from 'react';
import { translate } from '../../translate/translate';

import AddCoinOptionsCrypto from '../addcoin/addcoinOptionsCrypto';
import AddCoinOptionsAC from '../addcoin/addcoinOptionsAC';
import AddCoinOptionsACFiat from '../addcoin/addcoinOptionsACFiat';

const AtomicRender = function () {
  return (
    <div className="page margin-left-0">
      <div className="page-content" id="section-iguana-atomic-explorer">
        <div className="row" id="atomic-explorer">
          <div className="col-xlg-12 col-md-12">
            <h4 className="font-size-14 text-uppercase">Atomic Explorer</h4>
            <div className="panel panel-bordered">
              <div className="panel-body">
                <div className="col-sm-4 col-xs-12">
                  <div className="form-group">
                    <select
                      className="form-control
                        form-material"
                      id="atomic_explorer_select_coin_options"
                      onChange={ this.updateSelectedCoin }>
                      <option value="-">{ translate('INDEX.SELECT_COIN') }</option>
                      <AddCoinOptionsCrypto />
                      <AddCoinOptionsAC />
                      <AddCoinOptionsACFiat />
                    </select>
                  </div>
                </div>
                <div className="col-sm-4 col-xs-12 text-align-center">
                  <select
                    className="form-control form-material"
                    id="atomic_explorer_select_command_options"
                    onChange={ this.updateSelectedAPI }>
                    <option value="">-{ translate('ATOMIC.SELECT_COMMAND') }-</option>
                    { this.renderAtomicOptions() }
                  </select>
                </div>
                <div className="col-sm-4 col-xs-12 text-align-center">
                  <input
                    type="text"
                    className="form-control"
                    id="atomic_explorer_input_data"
                    name="atomic_explorer_input_data"
                    placeholder={ translate('ATOMIC.INPUT_PLACEHOLDER') }
                    onChange={ this.updateInput } />
                </div>
                <div className="col-sm-12 col-xs-12 text-align-center">
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light"
                    id="atomic_explorer_getcoinpeers_btn"
                    onClick={ this.getAtomicData }>{ translate('ATOMIC.SUBMIT') }</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xlg-4 col-md-12">
            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title">{ translate('ATOMIC.RAW_OUTPUT') }</h3>
              </div>
              <div className="panel-body">
                <div className="tab-content">
                  <pre id="atomic-explorer-commands-output">{ this.state.output }</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AtomicRender;