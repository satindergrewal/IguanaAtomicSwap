import React from 'react';
import { translate } from '../../translate/translate';

class WalletsNav extends React.Component {
  render() {
    return (
      <div className="page-main" id="section-dashboard" data-edexcoin="COIN">
        <div className="col-xs-12 padding-top-20" id="no_wallet_selected">
          <div className="alert alert-danger alert-dismissible agamainfo_alert" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            </button>
            <span style={{fontSize: '24px', textAlign: 'center'}}>
              <i className="icon fa-exclamation-triangle" aria-hidden="true"></i> <span className="agamainfo_msgtitle">Custom Title</span>
            </span>
            <br/>
            <span className="agamainfo_msg">Custom Message</span>.
          </div>

          <div className="alert alert-info alert-dismissible" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            </button>
            <span style={{fontSize: '24px', textAlign: 'center'}}>
              <i className="icon fa-paw" aria-hidden="true"></i> {translate('INDEX.NO_WALLET_CAPS')}
            </span>
            <br/>
            {translate('INDEX.PLEASE_SELECT_A_WALLET')}.
          </div>
        </div>
        <div className="page-header page-header-bordered header-easydex" id="header-dashboard" data-edexcoin="COIN">
          <ol className="breadcrumb" data-edexcoin="COIN">
            <b>{translate('INDEX.MY')} <span data-edexcoin="COIN" id="edexcoin-active">-</span> {translate('INDEX.ADDRESS')}: </b> <span data-edexcoin="COIN" id="edexcoin_active_addr">-</span> <button className="btn btn-default btn-xs clipboard-edexaddr" data-edexcoin="COIN" id="edexcoin_active_addr_clipboard" data-clipboard-text=""><i className="icon wb-copy" aria-hidden="true"></i> {translate('INDEX.COPY')}</button>
          </ol>
          <div className="page-header-actions" data-edexcoin="COIN" id="edexcoin-actions">
            <div id="kmd_header_button">
              <button type="button" className="btn btn-dark waves-effect waves-light" data-edexcoinmenu="COIN" id="btn_edexcoin_dashboard" style="display: none">
                <i className="icon md-view-dashboard" aria-hidden="true"></i> {translate('INDEX.DASHBOARD')}
              </button>
              <button type="button" className="btn btn-primary waves-effect waves-light" data-edexcoinmenu="COIN" id="btn_edexcoin_send">
                <i className="icon fa-send" aria-hidden="true"></i> {translate('INDEX.SEND')}
              </button>
              <button type="button" className="btn btn-info waves-effect waves-light" data-edexcoinmenu="COIN" id="btn_edexcoin_recieve">
                <i className="icon fa-inbox" aria-hidden="true"></i> {translate('INDEX.RECEIVE')}
              </button>
            </div>
          </div>
        </div>
    );
  }
}

export default WalletsNav;
