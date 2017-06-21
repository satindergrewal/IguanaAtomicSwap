import React from 'react';
import { translate } from '../../../translate/translate';

import WalletsHeader from '../walletsHeader/walletsHeader';

const JumblrRender = function() {
  return (
    <div className="page margin-left-0">
      <WalletsHeader activeSection="jumblr" />
      <div className="page-content margin-top-30">
        <div className="row">
          <div className="col-xs-12">
            <div className="alert alert-danger">
              <button type="button" className="close">
                <span>×</span>
              </button>
              <span className="jumblr-header">
                  <i className="icon fa-paw"></i> { translate('JUMBLR.NOTICE') }
                </span>
              <br />
              { translate('JUMBLR.DESCRIPTION') }
            </div>
          </div>

          <div className="col-xs-12">
            <div className="alert alert-info alert-dismissible">
              <button type="button" className="close">
                <span>×</span>
              </button>
              <span className="jumblr-header">
                  <i className="icon fa-paw"></i> { translate('JUMBLR.NEED_NATIVE') }
                </span>
              <br />
              { translate('JUMBLR.TO_USE_JUMBLR') }
              <br />
              { translate('JUMBLR.IF_YOU_ALREADY_RUNNING') }
            </div>
          </div>

          <div className="col-xlg-12 col-md-12">
            <p>{ translate('JUMBLR.THIS_SCREEN_DOESNT_REFRESH') }</p>
          </div>

          <div className="col-xs-12">
            <div className="panel-group">
              <div className="panel">
                <div
                  className="panel-heading"
                  onClick={ () => this.openTab(0) }>
                  <a className={ this.state.activeTab === 0 ? 'panel-title' : 'panel-title collapsed' }>{ translate('JUMBLR.FEW_SECURITY_NOTES') }</a>
                </div>
                <div className={ this.state.activeTab === 0 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }>
                  <div className="panel-body">
                    <ul>
                      <li>{ translate('JUMBLR.FEW_SECURITY_NOTES_DESC1') }</li>
                      <li>{ translate('JUMBLR.FEW_SECURITY_NOTES_DESC2') }</li>
                      <li>{ translate('JUMBLR.FEW_SECURITY_NOTES_DESC3') }</li>
                      <li>{ translate('JUMBLR.FEW_SECURITY_NOTES_DESC4') }</li>
                      <li>{ translate('JUMBLR.FEW_SECURITY_NOTES_DESC5') }</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div
                  className="panel-heading"
                  onClick={ () => this.openTab(1) }>
                  <a className={ this.state.activeTab === 1 ? 'panel-title' : 'panel-title collapsed' }>{ translate('JUMBLR.ACCESS_JUMBLR_FUNDS') }</a>
                </div>
                <div className={ this.state.activeTab === 1 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }>
                  <div className="panel-body">
                    <p>{ translate('JUMBLR.ADDRESS_ACCESSIBLE_EASILY') }</p>
                    <ul>
                      <code>duck dog cat donkey</code>
                    </ul>
                    <ol>
                      <li>{ translate('JUMBLR.TO_ACCESS') }</li>
                      <li>{ translate('JUMBLR.CLOSE_IAPP') }</li>
                      <li>{ translate('JUMBLR.START_IAPP') }</li>
                      <li>{ translate('JUMBLR.START_KMD') }</li>
                      <li>{ translate('JUMBLR.ACCESS_JUMBLR_FUNDS') }
                        <ul>
                          <li>{ translate('JUMBLR.SMALL_LETTERS') }</li>
                          <li>{ translate('JUMBLR.WHITE_SPACE') }</li>
                        </ul>
                      </li>
                      <li>
                        { translate('JUMBLR.PER_EXAMPLE') }
                        <br />
                        <code>jumblr duck dog cat donkey</code>
                      </li>
                      <li>{ translate('JUMBLR.LOGIN_WITH_JUMBLR') }</li>
                    </ol>
                    <h4>{ translate('JUMBLR.AGAIN_DONT_SHARE') }</h4>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-heading" onClick={ () => this.openTab(2) }>
                  <a className={ this.state.activeTab === 2 ? 'panel-title' : 'panel-title collapsed' }>{ translate('JUMBLR.USING_JUMBLR') }</a>
                </div>
                <div className={ this.state.activeTab === 2 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }>
                  <div className="panel-body">
                    <ul>
                      <li>{ translate('JUMBLR.RUN_KMD') }</li>
                      <li>{ translate('JUMBLR.LOGIN_KMD') }</li>
                      <li>{ translate('JUMBLR.GO_TO') }</li>
                      <li>{ translate('JUMBLR.FIND_DEPOSIT_ADDR') }</li>
                      <li>{ translate('JUMBLR.YOU_SEND_FUNDS') }</li>
                      <li>{ translate('JUMBLR.KEEP_WALLET_OPEN') }</li>
                      <li>{ translate('JUMBLR.IMPORTANT_FUNDS') }</li>
                      <li>{ translate('JUMBLR.LARGE_LOT') }</li>
                    </ul>
                    <p>{ this.renderLB('JUMBLR.EG') }</p>
                    <p>{ translate('JUMBLR.93_KMD') }</p>
                    <p>{ translate('JUMBLR.TO_CLEAR_THEM') }</p>
                    <p>{ translate('JUMBLR.WHEN_IT_TOTALS') }</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xlg-12 col-md-12">
            <h4 className="font-size-14 text-uppercase">{ translate('JUMBLR.JADDR') }</h4>
            <div className="panel">
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                  <tr>
                    <td width="20%">{ translate('JUMBLR.BTC_DEPOSIT') }</td>
                    <td>
                      <span></span>
                    </td>
                  </tr>
                  <tr>
                    <td>BTC Jumblr</td>
                    <td>
                      <button type="button" className="btn btn-animate btn-animate-side btn-default btn-sm waves-effect waves-light">
                        <span>
                          <i className="icon fa-eye"></i> { translate('JUMBLR.SHOW_HIDE') }
                        </span>
                      </button>
                      <span
                        className="label label-lg label-outline label-success"
                        style={{ display: 'none' }}></span>
                      <span className="label label-lg label-outline label-default">{ translate('JUMBLR.HIDDEN') }</span>
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('JUMBLR.KMD_DEPOSIT') }</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>KMD Jumblr</td>
                    <td>
                      <button type="button" className="btn btn-animate btn-animate-side btn-default btn-sm waves-effect waves-light">
                        <span>
                          <i className="icon fa-eye"></i> { translate('JUMBLR.SHOW_HIDE') }
                        </span>
                      </button>
                      <span
                        className="label label-lg label-outline label-success"
                        style={{ display: 'none' }}></span>
                      <span className="label label-lg label-outline label-default">{ translate('JUMBLR.HIDDEN') }</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-xlg-12 col-md-12">
            <h4 className="font-size-14 text-uppercase">{ translate('JUMBLR.JSTATUS') }</h4>
            <div className="panel">
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                  <tr>
                    <td width="20%">{ translate('JUMBLR.RESULT') }</td>
                    <td>
                      <span className="label label-success"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>{ translate('JUMBLR.DEPOSITED') }</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{ translate('JUMBLR.PUB_TO_PRIV') }</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{ translate('JUMBLR.PRIV_TO_PRIV') }</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{ translate('JUMBLR.PRIV_TO_PUB') }</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{ translate('JUMBLR.FINISHED') }</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{ translate('JUMBLR.PENDING') }</td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumblrRender;