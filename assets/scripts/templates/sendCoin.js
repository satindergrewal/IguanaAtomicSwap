templates.sendCoin =
`
<div class="col-sm-12 padding-top-10" data-edexcoin="COIN" id="edexcoin_send" style="display: none">
  <div class="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
    <!-- EasyDEX Panel send -->
    <!-- Sending EDEXCoin Steps Default -->
    <div class="steps row" style="margin-top: 10px">
      <div class="step col-md-4 current" id="edexcoin_send_step_1">
        <span class="step-number">1</span>
        <div class="step-desc">
          <span class="step-title" data-lang="INDEX.FILL_SEND_FORM"></span>
          <p data-lang="INDEX.FILL_SEND_DETAILS"></p>
        </div>
      </div>
      <div class="step col-md-4" id="edexcoin_send_step_2">
        <span class="step-number">2</span>
        <div class="step-desc">
          <span class="step-title" data-lang="INDEX.CONFIRMING"></span>
          <p data-lang="INDEX.CONFIRM_DETAILS"></p>
        </div>
      </div>
      <div class="step col-md-4" id="edexcoin_send_step_3">
        <span class="step-number">3</span>
        <div class="step-desc">
          <span class="step-title" data-lang="INDEX.PROCESSING_TX"></span>
          <p data-lang="INDEX.PROCESSING_DETAILS"></p>
        </div>
      </div>
    </div>
    <!-- End Sending EDEXCoin Steps Default -->

    <div class="panel" id="edexcoin-send-screen">
      <div class="panel-heading">
        <h3 data-edexcoin="COIN" class="panel-title">
          <span data-lang="INDEX.SEND"> <span data-edexcoin="COIN"></span>
        </h3>
        <div class="panel-actions">
          <a href="javascript:void(0)" class="dropdown-toggle white btn-xs btn-info btn_refresh_edexcoin_send" data-edexcoin="COIN" aria-expanded="false" role="button">
            <i class="icon fa-refresh margin-right-10" aria-hidden="true"></i> <span data-lang="INDEX.REFRESH_FUNDS"></span>
          </a>
        </div>
      </div>
      <div class="panel-body container-fluid">
        <form class="edexcoin-send-form" data-edexcoin="COIN" method="post" role="form" autocomplete="off" onsubmit="return false">
          <div class="row">
            <div class="col-xlg-12 form-group form-material edexcoin_send_from_for_basilisk">
              <label class="control-label" data-edexcoin="COIN" for="edexcoin_send_from" data-lang="INDEX.SEND_FROM"></label>
              <select class="form-control form-material showedexcoinaddrs show-tick" data-edexcoin="COIN" id="edexcoin_send_from" title="Select Transparent or Private Address" data-size="5"></select>
            </div>
            <div class="col-xlg-12 form-group form-material">
              <label class="control-label" data-edexcoin="COIN" for="edexcoin_sendto" data-lang="INDEX.SEND_TO"></label>
              <input type="text" class="form-control" data-edexcoin="COIN" id="edexcoin_sendto" name="edexcoin_sendto" placeholder="Enter address" autocomplete="off" required />
            </div>
            <div class="col-lg-6 form-group form-material">
              <label class="control-label" for="edexcoin_amount" data-edexcoin="COIN" id="edexcoin_amount_label">
                <span data-edexcoin="COIN"></span>
              </label>
              <input type="text" class="form-control" data-edexcoin="COIN" id="edexcoin_amount" name="edexcoin_amount" placeholder="0.000" autocomplete="off" />
            </div>
            <div class="col-lg-6 form-group form-material">
              <label class="control-label" data-edexcoin="COIN" for="edexcoin_fee" data-lang="INDEX.FEE">Fee</label>
              <input type="text" class="form-control" data-edexcoin="COIN" id="edexcoin_fee" name="edexcoin_fee" placeholder="0.000" value="0.0001" autocomplete="off" />
            </div>
            <div class="col-lg-12">
              <span data-edexcoin="KMD">
                <b><span data-lang="INDEX.TOTAL"></span> (<span data-edexcoin="COIN" data-lang="INDEX.AMOUNT_SM"></span> - txfee):</b> <span data-edexcoin="COIN" id="edexcoin_total_value">0.000</span> <span data-edexcoin="COIN" id="edexcoin_total_coinname" data-edexcoin="COIN"></span>
              </span>
            </div>
            <div class="col-lg-10 margin-top-10">
              <div class="pull-left margin-right-10">
                <input type="checkbox" id="edexcoin_send_sig" name="edexcoin_send_sig" data-plugin="switchery" data-size="small" />
              </div>
              <label class="padding-top-3" for="edexcoin_send_sig" data-lang="INDEX.DONT_SEND"></label>
            </div>
            <div class="col-lg-2">
              <button type="submit" class="btn btn-primary waves-effect waves-light pull-right edexcoin_send_coins_btn_step1">
                <span data-lang="INDEX.SEND"></span> <span data-edexcoin="COIN"></span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- EasyDEX Panel confirm send panel -->
  <div class="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
    <div class="panel" id="edexcoin-send-confirm-screen" style="display: none">
      <div class="panel-body">
        <div class="row">
          <div class="col-xs-12">
            <b data-lang="INDEX.TO"></b>
          </div>
          <div class="col-lg-6 col-sm-6 col-xs-12" id="mdl_confirm_currency_sendto_addr">[coin-address-goes-here]</div>
          <div class="col-lg-6 col-sm-6 col-xs-6">
            <span id="mdl_confirm_currency_send_amount">0.00000000</span> <span id="mdl_confirm_currency_coinname">[COIN]</span>
          </div>
          <!--<div class="col-lg-2 col-sm-2 col-xs-6" id="mdl_confirm_currency_send_amount_fiat">$0.00</div>-->
          <div class="col-lg-6 col-sm-6 col-xs-12" data-lang="INDEX.TX_FEE_REQ"></div>
          <div class="col-lg-6 col-sm-6 col-xs-6">
            <span id="mdl_confirm_currency_send_fee">0.00000000</span> <span id="mdl_confirm_currency_coinname_fee">[COIN]</span>
          </div>
          <!--<div class="col-lg-2 col-sm-2 col-xs-6" id="mdl_confirm_currency_send_fee_fiat">$0.00</div>-->
        </div>
        <br>

        <div class="row">
          <div class="col-xs-12">
            <b data-lang="INDEX.FROM"></b>
          </div>
          <div class="col-lg-6 col-sm-6 col-xs-12" id="mdl_confirm_currency_sendfrom_addr">[coin-address-goes-here]</div>
          <div class="col-lg-6 col-sm-6 col-xs-6" style="color: #f44336">
            <span id="mdl_confirm_currency_sendfrom_total_dedcut">-0.00000000</span> <span id="mdl_confirm_currency_coinname_total">[COIN]</span>
          </div>
          <!--<div class="col-lg-2 col-sm-2 col-xs-6" id="mdl_confirm_currency_sendfrom_total_deduct_fiat" style="color: #f44336">-$0.00</div>-->
        </div>
        <div class="widget-body-footer">
          <a class="btn btn-default waves-effect waves-light" id="edexcoin_send_coins_back_btn" data-lang="INDEX.BACK"></a>
          <div class="widget-actions pull-right">
            <button type="button" class="btn btn-primary" id="edexcoin_send_coins_btn" data-lang="INDEX.CONFIRM"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- EasyDEX Panel confirm send panel -->

  <!-- EasyDEX Panel send info panel -->
  <div class="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
    <div class="panel" id="edexcoin-send-txdetails-screen" style="display: none">
      <div class="panel-heading">
        <h4 class="panel-title" data-lang="INDEX.TRANSACTION_RESULT"></h4>
        <table class="table table-hover table-striped edexcoin_sendto_result" data-edexcoin="COIN" id="edexcoin_sendto_result">
          <thead>
            <tr>
              <th data-lang="INDEX.KEY"></th>
              <th data-lang="INDEX.INFO"></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <div class="widget-body-footer">
          <div class="widget-actions margin-bottom-15 margin-right-15">
            <button type="button" class="btn btn-primary" id="edexcoin_send_coins_anothertx_btn" data-lang="INDEX.MAKE_ANOTHER_TX"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- EasyDEX Panel send info panel -->
</div>
`;