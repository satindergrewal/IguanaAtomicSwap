import React from 'react';
import { translate } from '../../translate/translate';
import { sendToAddress } from '../../actions/actionCreators';
import Store from '../../store';

// TODO: implement logic

class SendCoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      sendFrom: this.props.Dashboard && this.props.Dashboard.activeHandle ? this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin] : null,
      sendFromAmount: 0,
      sendTo: null,
      amount: 0,
      fee: 0.0001,
      sendSig: false,
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSendSig = this.toggleSendSig.bind(this);
  }

  changeSendCoinStep(step) {
    this.setState(Object.assign({}, this.state, {
      currentStep: step,
    }));

    if (step === 2) {
      Store.dispatch(sendToAddress(this.props.ActiveCoin.coin, this.state));
    }
  }

  toggleSendSig() {
    this.setState(Object.assign({}, this.state, {
      sendSig: !this.state.sendSig,
    }));
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  }

  handleSubmit() {
    Store.dispatch(sendNativeTx(this.props.ActiveCoin.coin, this.state));
    setTimeout(function() {
      Store.dispatch(getKMDOPID(null, this.props.ActiveCoin.coin));
    }, 1000);
  }

  renderSendCoinResponse() {
    if (this.props.ActiveCoin.lastSendToResponse) {
      return Object.keys(this.props.ActiveCoin.lastSendToResponse).map((key, index) =>
        <tr key={key}>
          <td>{key}</td>
          <td>{key === 'signedtx' ? (
            this.props.ActiveCoin.lastSendToResponse[key].substring(0, this.props.ActiveCoin.lastSendToResponse[key].length / 3) + ' ' +
            this.props.ActiveCoin.lastSendToResponse[key].substring(this.props.ActiveCoin.lastSendToResponse[key].length / 3, this.props.ActiveCoin.lastSendToResponse[key].length * 2 / 3)) : this.props.ActiveCoin.lastSendToResponse[key]}</td>
        </tr>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props.ActiveCoin && this.props.ActiveCoin.send && this.props.ActiveCoin.mode !== 'native') {
      return (
        <div className="col-sm-12 padding-top-10" data-edexcoin="COIN" id="edexcoin_send">
          <div className="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="steps row" style={{marginTop: '10px'}}>
              <div className={this.state.currentStep === 0 ? 'step col-md-4 current' : 'step col-md-4'} id="edexcoin_send_step_1">
                <span className="step-number">1</span>
                <div className="step-desc">
                  <span className="step-title">{translate('INDEX.FILL_SEND_FORM')}</span>
                  <p>{translate('INDEX.FILL_SEND_DETAILS')}</p>
                </div>
              </div>
              <div className={this.state.currentStep === 1 ? 'step col-md-4 current' : 'step col-md-4'} id="edexcoin_send_step_2">
                <span className="step-number">2</span>
                <div className="step-desc">
                  <span className="step-title">{translate('INDEX.CONFIRMING')}</span>
                  <p>{translate('INDEX.CONFIRM_DETAILS')}</p>
                </div>
              </div>
              <div className={this.state.currentStep === 2 ? 'step col-md-4 current' : 'step col-md-4'} id="edexcoin_send_step_3">
                <span className="step-number">3</span>
                <div className="step-desc">
                  <span className="step-title">{translate('INDEX.PROCESSING_TX')}</span>
                  <p>{translate('INDEX.PROCESSING_DETAILS')}</p>
                </div>
              </div>
            </div>

            <div className={this.state.currentStep === 0 ? 'panel' : 'panel hide'} id="edexcoin-send-screen">
              <div className="panel-heading">
                <h3 data-edexcoin="COIN" className="panel-title">
                  {translate('INDEX.SEND')} {this.props.ActiveCoin.coin}
                </h3>
              </div>
              <div className="panel-body container-fluid">
                <form className="edexcoin-send-form" data-edexcoin="COIN" method="post" role="form" autoComplete="off">
                  <div className="row">
                    <div className={this.props.ActiveCoin.mode === 'basilisk' ? 'col-xlg-12 form-group form-material' : 'hide'}>
                      <label className="control-label" data-edexcoin="COIN" htmlFor="edexcoin_send_from">{translate('INDEX.SEND_FROM')}</label>
                      <select className="form-control form-material showedexcoinaddrs show-tick" data-edexcoin="COIN" id="edexcoin_send_from" onChange={this.updateInput} title="Select Transparent or Private Address" data-size="5"></select>
                    </div>
                    <div className="col-xlg-12 form-group form-material">
                      <label className="control-label" data-edexcoin="COIN" htmlFor="edexcoin_sendto">{translate('INDEX.SEND_TO')}</label>
                      <input type="text" className="form-control" data-edexcoin="COIN" id="edexcoin_sendto" name="sendTo" placeholder="Enter address" autoComplete="off" onChange={this.updateInput} required />
                    </div>
                    <div className="col-lg-6 form-group form-material">
                      <label className="control-label" htmlFor="edexcoin_amount" data-edexcoin="COIN" id="edexcoin_amount_label">
                        {this.props.ActiveCoin.coin}
                      </label>
                      <input type="text" className="form-control" data-edexcoin="COIN" id="edexcoin_amount" name="amount" placeholder="0.000" autoComplete="off" onChange={this.updateInput} />
                    </div>
                    <div className="col-lg-6 form-group form-material">
                      <label className="control-label" data-edexcoin="COIN" htmlFor="edexcoin_fee">{translate('INDEX.FEE')}</label>
                      <input type="text" className="form-control" data-edexcoin="COIN" id="edexcoin_fee" name="fee" defaultValue={this.state.fee} placeholder="0.000" autoComplete="off" onChange={this.updateInput} />
                    </div>
                    <div className="col-lg-12">
                      <span data-edexcoin="KMD">
                        <b>{translate('INDEX.TOTAL')} (<span data-edexcoin="COIN">{translate('INDEX.AMOUNT_SM')}</span> - txfee):</b> <span data-edexcoin="COIN" id="edexcoin_total_value">{Number(this.state.amount) - Number(this.state.fee)}</span> {this.props.ActiveCoin.coin}
                      </span>
                    </div>
                    <div className="col-lg-10 margin-top-10">
                      <div className="pull-left margin-right-10">
                        <input type="checkbox" id="edexcoin_send_sig" onClick={this.toggleSendSig} data-plugin="switchery" data-size="small" />
                      </div>
                      <label className="padding-top-3" htmlFor="edexcoin_send_sig" onClick={this.toggleSendSig}>{translate('INDEX.DONT_SEND')}</label>
                    </div>
                    <div className="col-lg-2">
                      <button type="button" className="btn btn-primary waves-effect waves-light pull-right edexcoin_send_coins_btn_step1" onClick={() => this.changeSendCoinStep(1)}>
                        {translate('INDEX.SEND')} {Number(this.state.amount) - Number(this.state.fee)} {this.props.ActiveCoin.coin}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className={this.state.currentStep === 1 ? 'col-xlg-12 col-md-12 col-sm-12 col-xs-12' : 'col-xlg-12 col-md-12 col-sm-12 col-xs-12 hide'}>
            <div className="panel" id="edexcoin-send-confirm-screen">
              <div className="panel-body">
                <div className="row">
                  <div className="col-xs-12">
                    <b>{translate('INDEX.TO')}</b>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12" id="mdl_confirm_currency_sendto_addr">{this.state.sendTo}</div>
                  <div className="col-lg-6 col-sm-6 col-xs-6">
                    <span id="mdl_confirm_currency_send_amount">{this.state.amount}</span> {this.props.ActiveCoin.coin}
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">{translate('INDEX.TX_FEE_REQ')}</div>
                  <div className="col-lg-6 col-sm-6 col-xs-6">
                    <span id="mdl_confirm_currency_send_fee">{this.state.fee}</span> {this.props.ActiveCoin.coin}
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-xs-12">
                    <b>{translate('INDEX.FROM')}</b>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12" id="mdl_confirm_currency_sendfrom_addr">{this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin]}</div>
                  <div className="col-lg-6 col-sm-6 col-xs-6" style={{color: '#f44336'}}>
                    <span id="mdl_confirm_currency_sendfrom_total_dedcut">{Number(this.state.amount) - Number(this.state.fee)}</span> {this.props.ActiveCoin.coin}
                  </div>
                </div>
                <div className="widget-body-footer">
                  <a className="btn btn-default waves-effect waves-light" id="edexcoin_send_coins_back_btn" onClick={() => this.changeSendCoinStep(0)}>{translate('INDEX.BACK')}</a>
                  <div className="widget-actions pull-right">
                    <button type="button" className="btn btn-primary" id="edexcoin_send_coins_btn" onClick={() => this.changeSendCoinStep(2)}>{translate('INDEX.CONFIRM')}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={this.state.currentStep === 2 ? 'col-xlg-12 col-md-12 col-sm-12 col-xs-12' : 'col-xlg-12 col-md-12 col-sm-12 col-xs-12 hide'}>
            <div className="panel" id="edexcoin-send-txdetails-screen">
              <div className="panel-heading">
                <h4 className="panel-title">{translate('INDEX.TRANSACTION_RESULT')}</h4>
                <table className="table table-hover table-striped edexcoin_sendto_result" data-edexcoin="COIN" id="edexcoin_sendto_result">
                  <thead>
                    <tr>
                      <th>{translate('INDEX.KEY')}</th>
                      <th>{translate('INDEX.INFO')}</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.renderSendCoinResponse()}
                  </tbody>
                </table>
                <div className="widget-body-footer">
                  <div className="widget-actions margin-bottom-15 margin-right-15">
                    <button type="button" className="btn btn-primary" id="edexcoin_send_coins_anothertx_btn" onClick={() => this.changeSendCoinStep(0)}>{translate('INDEX.MAKE_ANOTHER_TX')}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SendCoin;
