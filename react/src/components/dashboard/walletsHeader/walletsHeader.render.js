import React from 'react';
import { translate } from '../../../translate/translate';

const WalletsHeaderRender = function() {
  return (
    <div
      className="page-header page-header-bordered header-easydex margin-bottom-0"
      id="easydex-header-div"
      style={{ backgroundImage: `url("assets/images/bg/${this.props.activeSection}_transparent_header_bg.png")`, backgroundRepeat: 'no-repeat', backgroundPosition: '0%' }}>
      <h1 className={ this.isActiveSectionJumblr() ? 'hide' : 'page-title' }>EasyDEX</h1>
      <ol className="breadcrumb">
        <li className={ this.isActiveSectionJumblr() ? 'hide' : 'header-easydex-section' }>{ translate('INDEX.DASHBOARD') }</li>
        <li className={ !this.isActiveSectionJumblr() ? 'hide' : 'header-easydex-section' }>
          <img src="assets/images/native/jumblr_header_title_logo.png" /><br /> { translate('SIDEBAR.JUMBLR_MOTTO') }
        </li>
      </ol>
      <div className="page-header-actions z-index-1 hide">
        <div id="kmd_header_button">
          <button
            type="button"
            className="bg-teal-500 btn btn-floating white waves-effect waves-float waves-light">
            <i className="icon md-plus"></i>
          </button>
          <ul className="dropdown-menu animate dropdown-menu-right">
            <li>
              <a>{ translate('INDEX.DASHBOARD') }</a>
            </li>
            <li>
              <a>{ translate('INDEX.SEND') }</a>
            </li>
            <li>
              <a>{ translate('INDEX.RECEIVE') }</a>
            </li>
            <li className="divider"></li>
            <li>
              <a>{ translate('INDEX.SETTINGS') }</a>
            </li>
          </ul>
        </div>

        <div id="zec_header_button" className="hide">
          <button
            type="button"
            className="bg-yellow-600 btn btn-floating white waves-effect waves-float waves-light">
            <i className="icon md-plus"></i>
          </button>
          <ul className="dropdown-menu animate dropdown-menu-right">
            <li>
              <a>{ translate('INDEX.DASHBOARD') }</a>
            </li>
            <li>
              <a>{ translate('INDEX.SEND') }</a>
            </li>
            <li>
              <a>{ translate('INDEX.RECEIVE') }</a>
            </li>
            <li className="divider"></li>
            <li>
              <a>{ translate('INDEX.SETTINGS') }</a>
            </li>
          </ul>
        </div>

        <div id="kmd_header_button">
          <button
            type="button"
            className="btn white waves-effect waves-light">
            <i className="icon fa-refresh"></i>{ translate('INDEX.REFRESH') }
          </button>
        </div>

        <div id="kmd_header_button" className="hide">
          <button
            type="button"
            className="bg-teal-500 btn btn-floating white waves-effect waves-float waves-light">
            <i className="icon md-plus"></i>
          </button>
          <ul className="dropdown-menu animate dropdown-menu-right">
            <li>
              <a>{ translate('INDEX.DASHBOARD') }</a>
            </li>
            <li>
              <a>{ translate('INDEX.SEND') }</a>
            </li>
            <li>
              <a>{ translate('INDEX.RECEIVE') }</a>
            </li>
            <li className="divider"></li>
            <li>
              <a>{ translate('INDEX.SETTINGS') }</a>
            </li>
          </ul>
        </div>

        <div className="row no-space width-350 hidden-xs hide">
          <div className="col-xs-6">
            <div className="counter">
              <span className="font-weight-medium"> - BTC</span>
              <span className="counter-label small"> - USD</span>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="counter">
              <span className="font-weight-medium"> - BTCD</span>
              <span className="counter-label small"> - USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletsHeaderRender;