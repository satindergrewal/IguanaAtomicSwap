import React from 'react';
import { translate } from '../../../translate/translate';

const CoinTileRender = function() {
  return (
    <div className="page-aside padding-top-80">
      <div className="page-aside-switch">
        <i className="icon md-chevron-left"></i>
        <i className="icon md-chevron-right"></i>
      </div>
      <div className="page-aside-inner">
        <div className="search-wallet-widgets panel hide">
          <div className="panel-heading">
            <div className="panel-actions">
              <div className="input-search input-group-sm">
                <button type="submit" className="input-search-btn">
                  <i className="icon md-search"></i>
                </button>
                <input type="text" className="form-control" placeholder="Search..." disabled />
              </div>
            </div>
            <h3 className="panel-title">{ translate('INDEX.ACTIVE_COINS') }</h3>
          </div>
        </div>
        <div className="wallet-widgets-list">
          <div>
            <div>
              <div className="list-group row wallet-widgets-row">
                { this.renderTiles() }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinTileRender;