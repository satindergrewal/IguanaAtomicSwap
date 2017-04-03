import React from 'react';
import { translate } from '../../translate/translate';

className WalletsBasiliskRefresh extends React.Component {
  render() {
    return (
      <div data-edexcoin="COIN" id="edexcoin_dashboard_basilisk_refresh_status" style="display: none">
        <div class="col-xs-12 margin-top-20">
          <div class="col-xs-12">
            <!-- Panel Tasks -->
            <div class="panel">
              <div class="panel-heading">
                <h3 class="panel-title" data-lang="INDEX.FETCHING_BASILISK_DATA"></h3>
                <div class="panel-actions">
                  <a class="panel-action icon md-refresh-alt" data-toggle="panel-refresh" data-load-type="blue-only" aria-hidden="true"></a>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover table-striped tbl_edexcoin_dashboard_basilisk_refresh_status">
                  <thead>
                    <tr>
                      <th data-lang="INDEX.ADDRESS"></th>
                      <th data-lang="INDEX.LIST_UNSPENT"></th>
                      <th data-lang="INDEX.LIST_TRANSACTIONS"></th>
                      <th data-lang="INDEX.GET_BALANCE"></th>
                      <th data-lang="INDEX.REFRESH"></th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <!-- End Panel Tasks -->
          </div>
        </div>
      </div>
    );
  }
}

export default WalletsBasiliskRefresh;
