import React from 'react';
import { translate } from '../../translate/translate';

class WalletsNav extends React.Component {
  render() {
    return (
      <div className="page-main" id="section-dashboard" data-edexcoin="COIN">
        <div className="col-xs-12 padding-top-20" id="no_wallet_selected">
          <div className="alert alert-danger alert-dismissible agamainfo_alert" role="alert" style="display: none;">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            </button>
            <span style="font-size:24px; text-align: center">
              <i className="icon fa-exclamation-triangle" aria-hidden="true"></i> <span className="agamainfo_msgtitle">Custom Title</span>
            </span>
            <br/>
            <span className="agamainfo_msg">Custom Message</span>.
          </div>

          <div className="alert alert-info alert-dismissible" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            </button>
            <span style="font-size:24px; text-align: center">
              <i className="icon fa-paw" aria-hidden="true"></i> <span data-lang="INDEX.NO_WALLET_CAPS"></span>
            </span>
            <br/>
            <span data-lang="INDEX.PLEASE_SELECT_A_WALLET"></span>.
          </div>
        </div>
        <div className="page-header page-header-bordered header-easydex" id="header-dashboard" data-edexcoin="COIN" style="display: none">
          <ol className="breadcrumb" data-edexcoin="COIN">
            <b><span data-lang="INDEX.MY"></span> <span data-edexcoin="COIN" id="edexcoin-active">-</span> <span data-lang="INDEX.ADDRESS"></span>: </b> <span data-edexcoin="COIN" id="edexcoin_active_addr">-</span> <button className="btn btn-default btn-xs clipboard-edexaddr" data-edexcoin="COIN" id="edexcoin_active_addr_clipboard" data-clipboard-text=""><i className="icon wb-copy" aria-hidden="true"></i> <span data-lang="INDEX.COPY"></span></button>
          </ol>
          <div className="page-header-actions" data-edexcoin="COIN" id="edexcoin-actions">
            <div id="kmd_header_button">
              <button type="button" className="btn btn-dark waves-effect waves-light" data-edexcoinmenu="COIN" id="btn_edexcoin_dashboard" style="display: none">
                <i className="icon md-view-dashboard" aria-hidden="true"></i> <span data-lang="INDEX.DASHBOARD"></span>
              </button>
              <button type="button" className="btn btn-primary waves-effect waves-light" data-edexcoinmenu="COIN" id="btn_edexcoin_send">
                <i className="icon fa-send" aria-hidden="true"></i> <span data-lang="INDEX.SEND"></span>
              </button>
              <button type="button" className="btn btn-info waves-effect waves-light" data-edexcoinmenu="COIN" id="btn_edexcoin_recieve">
                <i className="icon fa-inbox" aria-hidden="true"></i> <span data-lang="INDEX.RECEIVE"></span>
              </button>
            </div>
          </div>
        </div>
    );
  }
}

export default WalletsNav;
