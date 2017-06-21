templates.addCoinLoginModal =
`
<!-- Modal -->
<div class="modal fade modal-3d-sign" id="AddCoinDilogModel-login" aria-hidden="true" aria-labelledby="AddCoinDilogModel-login" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-center modal-lg">
    <div class="modal-content">
      <div class="modal-header bg-orange-a400 wallet-send-header">
        <button type="button" class="close white" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <h4 class="modal-title white" data-lang="INDEX.SELECT_A_COIN"></h4>
      </div>
      <div class="modal-body">
        <div class="col-sm-8">
          <div class="form-group">
            <select class="form-control form-material" id="addcoin_select_coin_mdl_options-login">
              <option data-lang="INDEX.SELECT"></option>
              ${templates.addCoinOptions}
            </select>
          </div>
        </div>
        <div class="col-sm-4" style="text-align: center">
          <button type="button" class="btn btn-primary mdl_addcoin_done_btn-login" data-toggle="modal" data-dismiss="modal" id="mdl_addcoin_done_btn-login" data-lang="INDEX.ACTIVATE_COIN"></button>
        </div>
        <div class="col-sm-12 text-center">
          <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl-login">
            <input type="radio" class="to-labelauty labelauty" name="addcoin_select_mode_mdl-login" data-plugin="labelauty" id="addcoin_mdl_full_mode_login" data-labelauty="Full Mode|Full Mode" value="1" checked>
          </div>
          <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl-login">
            <input type="radio" class="to-labelauty labelauty" name="addcoin_select_mode_mdl-login" data-plugin="labelauty" id="addcoin_mdl_basilisk_mode_login" value="0" data-labelauty="Basilisk Mode|Basilisk Mode">
          </div>
          <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12 style-addcoin-lbl-mdl-login">
            <input type="radio" class="to-labelauty labelauty" name="addcoin_select_mode_mdl-login" data-plugin="labelauty" id="addcoin_mdl_native_mode_login" value="-1" data-labelauty="Native Mode|Native Mode">
          </div>
        </div>
        <div class="col-sm-12" style="color: #333">
        	<p>
            <strong><span data-lang="INDEX.FULL_MODE"></span>:</strong> <span data-lang="INDEX.FULL_MODE_DESC"></span>
          </p>
          <p>
            <strong><span data-lang="INDEX.BASILISK_MODE"></span>:</strong> <span data-lang="INDEX.BASILISK_MODE_DESC"></span>
          </p>
          <p>
            <strong><span data-lang="INDEX.NATIVE_MODE"></span>:</strong> <span data-lang="INDEX.NATIVE_MODE_DESC1"></span> <strong>Komodo Daemon</strong> <span data-lang="INDEX.NATIVE_MODE_DESC2"></span> <i>Iguana Daemon</i> <span data-lang="INDEX.NATIVE_MODE_DESC3"></span>.
          </p>
          <div class="alert alert-icon alert-primary" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
            <i class="icon md-info-outline" aria-hidden="true"></i> <strong data-lang="INDEX.NATIVE_MODE"></strong> <span data-lang="INDEX.NATIVE_MODE_DESC4"></span> <strong data-lang="INDEX.NATIVE_MODE_DESC5"></strong>, <i data-lang="INDEX.NATIVE_MODE_DESC5"></i>.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- End Modal -->
`;