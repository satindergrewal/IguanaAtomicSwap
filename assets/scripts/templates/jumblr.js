templates.jumblr =
`
<!-- BEGIN JUMBLR CONTENT BODY -->
<div class="page animsition" data-animsition-in="fade-in" data-animsition-out="fade-out" style="margin-left: 0px">
  <div class="page-content" id="section-jumblr">
    <div class="row" id="jumblr_dashboard" data-plugin="masonry">
      <div class="col-xs-12" id="jumblr_testing_alert">
        <div class="alert alert-danger" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <span style="font-size:24px; text-align: center">
            <i class="icon fa-paw" aria-hidden="true"></i> <span data-lang="JUMBLR.NOTICE"></span>
          </span>
          <br>
          <span data-lang="JUMBLR.DESCRIPTION"></span>
        </div>
      </div>

      <div class="col-xs-12" id="jumblr_no_native_kmd_alert">
        <div class="alert alert-info alert-dismissible" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <span style="font-size: 24px; text-align: center">
            <i class="icon fa-paw" aria-hidden="true"></i> <span data-lang="JUMBLR.NEED_NATIVE"></span>
          </span>
          <br>
          <span data-lang="JUMBLR.TO_USE_JUMBLR"></span>
          <br>
          <span data-lang="JUMBLR.IF_YOU_ALREADY_RUNNING"></span>
        </div>
      </div>

      <div class="col-xlg-12 col-md-12">
        <p data-lang="JUMBLR.THIS_SCREEN_DOESNT_REFRESH"></p>
      </div>

      <div class="col-xs-12">
        <div class="panel-group" id="jumber_quick_info" aria-multiselectable="true" role="tablist">
          <div class="panel">
            <div class="panel-heading" id="jumblr_security_notes" role="tab">
              <a class="panel-title" data-toggle="collapse" href="#jumblr_security_notes_1" data-parent="#jumber_quick_info" aria-expanded="true" aria-controls="jumblr_security_notes_1" data-lang="JUMBLR.FEW_SECURITY_NOTES"></a>
            </div>
            <div class="panel-collapse collapse in" id="jumblr_security_notes_1" aria-labelledby="jumblr_security_notes" role="tabpanel">
              <div class="panel-body">
                <ul>
                  <li data-lang="JUMBLR.FEW_SECURITY_NOTES_DESC1"></li>
                  <li data-lang="JUMBLR.FEW_SECURITY_NOTES_DESC2"></li>
                  <li data-lang="JUMBLR.FEW_SECURITY_NOTES_DESC3"></li>
                  <li data-lang="JUMBLR.FEW_SECURITY_NOTES_DESC4"></li>
                  <li data-lang="JUMBLR.FEW_SECURITY_NOTES_DESC5"></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-heading" id="jumblr_access_funds" role="tab">
              <a class="panel-title collapsed" data-toggle="collapse" href="#jumblr_access_funds_2" data-parent="#jumber_quick_info" aria-expanded="false" aria-controls="jumblr_access_funds_2" data-lang="JUMBLR.ACCESS_JUMBLR_FUNDS"></a>
            </div>
            <div class="panel-collapse collapse" id="jumblr_access_funds_2" aria-labelledby="jumblr_access_funds" role="tabpanel">
              <div class="panel-body">
                <p data-lang="JUMBLR.ADDRESS_ACCESSIBLE_EASILY"></p>
                <ul>
                  <code>duck dog cat donkey</code>
                </ul>
                <ol>
                  <li data-lang="JUMBLR.TO_ACCESS"></li>
                  <li data-lang="JUMBLR.CLOSE_IAPP"></li>
                  <li data-lang="JUMBLR.START_IAPP"></li>
                  <li data-lang="JUMBLR.START_KMD"></li>
                  <li><span data-lang="JUMBLR.WORD_JUMBLR"></span>
                    <ul>
                      <li data-lang="JUMBLR.SMALL_LETTERS"></li>
                      <li data-lang="JUMBLR.WHITE_SPACE"></li>
                    </ul>
                  </li>
                  <li>
                    <span data-lang="JUMBLR.PER_EXAMPLE"></span>
                    <br>
                    <code>jumblr duck dog cat donkey</code>
                  </li>
                  <li data-lang="JUMBLR.LOGIN_WITH_JUMBLR"></li>
                </ol>
                <h4 data-lang="JUMBLR.AGAIN_DONT_SHARE"></h4>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-heading" id="jumblr_using_jumblr" role="tab">
              <a class="panel-title collapsed" data-toggle="collapse" href="#jumblr_using_jumblr_3" data-parent="#jumber_quick_info" aria-expanded="false" aria-controls="jumblr_using_jumblr_3" data-lang="JUMBLR.USING_JUMBLR"></a>
            </div>
            <div class="panel-collapse collapse" id="jumblr_using_jumblr_3" aria-labelledby="jumblr_using_jumblr"
            role="tabpanel">
              <div class="panel-body">
                <ul>
                  <li data-lang="JUMBLR.RUN_KMD"></li>
                  <li data-lang="JUMBLR.LOGIN_KMD"></li>
                  <li data-lang="JUMBLR.GO_TO"></li>
                  <li data-lang="JUMBLR.FIND_DEPOSIT_ADDR"></li>
                  <li data-lang="JUMBLR.YOU_SEND_FUNDS"></li>
                  <li data-lang="JUMBLR.KEEP_WALLET_OPEN"></li>
                  <li data-lang="JUMBLR.IMPORTANT_FUNDS"></li>
                  <li data-lang="JUMBLR.LARGE_LOT"></li>
                </ul>
                <p data-lang="JUMBLR.EG"></p>
                <p data-lang="JUMBLR.93_KMD"></p>
                <p data-lang="JUMBLR.TO_CLEAR_THEM"></p>
                <p data-lang="JUMBLR.WHEN_IT_TOTALS"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Jumblr Tab -->
      <div class="col-xlg-12 col-md-12">
        <h4 class="font-size-14 text-uppercase" data-lang="JUMBLR.JADDR">Jumblr Addresses</h4>
        <div class="panel" id="projects">
          <div class="table-responsive">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td width="20%" data-lang="JUMBLR.BTC_DEPOSIT"></td>
                  <td>
                    <span id="jumblr_BTCdeposit"></span>
                  </td>
                </tr>
                <tr>
                  <td>BTC Jumblr</td>
                  <td>
                    <button type="button" class="btn btn-animate btn-animate-side btn-default btn-sm waves-effect waves-light jumblr_show_hide_addr_btc_btn" data-jumblr="BTCjumblr">
                      <span><i class="icon fa-eye" aria-hidden="true"></i> <span data-lang="JUMBLR.SHOW_HIDE"></span></span>
                    </button>
                    <span class="label label-lg label-outline label-success" id="jumblr_BTCjumblr" style="display: none"></span>
                    <span class="label label-lg label-outline label-default" id="jumblr_BTCjumblr_showhide" data-lang="JUMBLR.HIDDEN"></span>
                  </td>
                </tr>
                <tr>
                  <td data-lang="JUMBLR.KMD_DEPOSIT"></td>
                  <td>
                    <span id="jumblr_KMDdeposit"></span>
                  </td>
                </tr>
                <tr>
                  <td>KMD Jumblr</td>
                  <td>
                    <button type="button" class="btn btn-animate btn-animate-side btn-default btn-sm waves-effect waves-light jumblr_show_hide_addr_kmd_btn" data-jumblr="KMDjumblr">
                      <span><i class="icon fa-eye" aria-hidden="true"></i> <span data-lang="JUMBLR.SHOW_HIDE"></span></span>
                    </button>
                    <span class="label label-lg label-outline label-success" id="jumblr_KMDjumblr" style="display: none"></span>
                    <span class="label label-lg label-outline label-default" id="jumblr_KMDjumblr_showhide" data-lang="JUMBLR.HIDDEN"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- End Jumblr tab -->

      <!-- Jumblr Tab -->
      <div class="col-xlg-12 col-md-12">
        <h4 class="font-size-14 text-uppercase" data-lang="JUMBLR.JSTATUS"></h4>
        <div class="panel" id="projects">
          <div class="table-responsive">
            <table class="table table-striped">
              <tbody>
                <!--<tr><td>BTC Deposit</td><td><span id="jumblr_status_BTCdeposit"></span></td></tr>
                <tr><td>BTC Jumblr</td><td><span id="jumblr_status_BTCjumblr"></span></td></tr>
                <tr><td>KMD Deposit</td><td><span id="jumblr_status_KMDdeposit"></span></td></tr>
                <tr><td>KMD Jumblr</td><td><span id="jumblr_status_KMDjumblr"></span></td></tr>-->
                <tr>
                  <td width="20%" data-lang="JUMBLR.RESULT"></td>
                  <td>
                    <span id="jumblr_status_result" class="label label-success"></span>
                  </td>
                </tr>
                <tr>
                  <td data-lang="JUMBLR.DEPOSITED"></td>
                  <td>
                    <span id="jumblr_status_deposited"></span>
                  </td>
                </tr>
                <tr>
                  <td data-lang="JUMBLR.PUB_TO_PRIV"></td>
                  <td>
                    <span id="jumblr_status_t_to_z"></span>
                  </td>
                </tr>
                <tr>
                  <td data-lang="JUMBLR.PRIV_TO_PRIV"></td>
                  <td>
                    <span id="jumblr_status_z_to_z"></span>
                  </td>
                </tr>
                <tr>
                  <td data-lang="JUMBLR.PRIV_TO_PUB"></td>
                  <td>
                    <span id="jumblr_status_z_to_t"></span>
                  </td>
                </tr>
                <tr>
                  <td data-lang="JUMBLR.FINISHED"></td>
                  <td>
                    <span id="jumblr_status_finished"></span>
                  </td>
                </tr>
                <tr>
                  <td data-lang="JUMBLR.PENDING"></td>
                  <td>
                    <span id="jumblr_status_pending"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- End Jumblr tab -->
    </div>
  </div>
</div>
<!-- END JUMBLR CONTENT BODY -->
`;