templates.loginPage =
`
<!-- BEGIN Login Page -->
<div id="wallet-login">
  <div class="page animsition vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content vertical-align-middle">
      <div class="brand">
        <img class="brand-img" src="assets/images/easydex-logo-big.png" alt="SuperNET Iguana">
      </div>
      <!-- BEGIN IE Warning -->
      <div id="section-ie-warning" style="display: none">
        <!-- Example Panel Alert -->
        <div class="panel">
          <div class="panel-heading">
            <h3 class="panel-title" data-lang="INDEX.UNSUPPORTED_BROWSER"></h3>
          </div>
          <div class="alert alert-danger alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only" data-lang="INDEX.CLOSE">Close</span>
            </button>
            <span data-lang="INDEX.IE_UNSUPPORTED"></span>
          </div>
          <div class="panel-body">
            <p style="color: #424242">
              <span data-lang="INDEX.PLEASE_USE"></span> <a href="https://www.google.com/chrome/">Google Chrome</a> <span data-lang="INDEX.OR"></span> <a href="https://www.firefox.com">Mozilla FireFox</a> <span data-lang="INDEX.TO_USE"></span> EasyDEX-GUI. <span data-lang="INDEX.PLEASE_CLICK_ON"></span>.
            </p>
            <div class="col-sm-6 col-xs-6">
              <a href="https://www.google.com/chrome/"><img class="brand-img" src="assets/images/browsers/chrome.png" alt="Google Chrome"></a>
            </div>
            <div class="col-sm-6 col-xs-6">
              <a href="https://www.firefox.com"><img class="brand-img" src="assets/images/browsers/firefox.png" alt="Mozilla FireFox"></a>
            </div>
          </div>
        </div>
        <!-- End Example Panel Alert -->
      </div>
      <!-- END IE Warning -->
      <!-- BEGIN section login -->
      <div id="section-login" style="display: none">
        <h4 style="color: #fff" id="login-welcome" data-lang="INDEX.WELCOME_LOGIN"></h4>
        <form class="login-form" method="post" action="javascript:" autocomplete="off" onsubmit="return false">
          <div class="form-group form-material floating">
            <input type="password" class="form-control" name="password" id="password">
            <label class="floating-label" for="inputPassword" data-lang="INDEX.WALLET_SEED"></label>
          </div>
          <button type="submit" class="btn btn-primary btn-block" id="loginbtn" data-lang="INDEX.SIGN_IN"></button>
          <div class="form-group form-material floating">
            <button class="btn btn-lg btn-flat btn-block waves-effect" id="register-btn" data-lang="INDEX.CREATE_WALLET"></button>
            <button class="btn btn-lg btn-flat btn-block waves-effect" id="logint-another-wallet" data-lang="INDEX.LOGIN_ANOTHER_WALLET"></button>
          </div>
        </form>
      </div>
      <!-- END section login -->

      <!-- BEGIN section login add coin -->
      <div id="section-login-addcoin-btn">
        <h4 style="color: #fff" id="login-welcome" data-lang="INDEX.WELCOME_PLEASE_ADD"></h4>
        <div class="form-group form-material floating" style="width: 540px; margin: 30px 0">
          <button class="btn btn-lg btn-primary btn-block ladda-button" id="start-coin-login" role="menuitem" data-edexcoinmenu="COIN" data-target="#AddCoinDilogModel-login" data-toggle="modal" data-style="expand-left" data-plugin="ladda"><span class="ladda-label" data-lang="INDEX.ACTIVATE_COIN"></span></button>
        </div>
      </div>
      <!-- END section login add coin -->

      <!-- BEGIN section register -->
      <div id="section-register" style="display: none">
        <form class="register-form" method="post" role="form" autocomplete="off" onsubmit="return false">
          <h4 class="hint" style="color: #fff">
            <span data-lang="INDEX.SELECT_SEED_TYPE"></span>:
          </h4>
          <div class="form-group form-material floating">
            <div class="radio-custom radio-default radio-inline">
              <input type="radio" id="PassPhraseOptionsIguana" value="PassPhraseOptionsIguana" name="PassPhraseOptions" checked="">
              <label for="PassPhraseOptionsIguana">Iguana (256 bits)</label>
            </div>
            <div class="radio-custom radio-default radio-inline">
              <input type="radio" id="PassPhraseOptionsWaves" value="PassPhraseOptionsWaves" name="PassPhraseOptions">
              <label for="PassPhraseOptionsWaves">Waves</label>
            </div>
            <div class="radio-custom radio-default radio-inline">
              <input type="radio" id="PassPhraseOptionsNXT" value="PassPhraseOptionsNXT" name="PassPhraseOptions">
              <label for="PassPhraseOptionsNXT">NXT</label>
            </div>
          </div>
          <div class="form-group form-material floating">
            <textarea class="form-control placeholder-no-fix" type="text" placeholder="" name="walletseed" id="walletseed" style="height: 100px"></textarea>
            <label class="floating-label" for="walletseed" data-lang="INDEX.WALLET_SEED"></label>
          </div>
          <div class="form-group form-material floating">
            <textarea class="form-control placeholder-no-fix" type="text" placeholder="" name="rwalletseed" id="rwalletseed" style="height: 100px"></textarea>
            <label class="floating-label" for="rwalletseed" data-lang="INDEX.CONFIRM_SEED"></label>
          </div>
          <button type="submit" id="register-submit-btn" class="btn btn-primary btn-block" data-lang="INDEX.REGISTER"></button>
          <div class="form-group form-material floating">
            <button class="btn btn-lg btn-flat btn-block waves-effect" id="register-back-btn" data-lang="INDEX.BACK_TO_LOGIN"></button>
          </div>
        </form>
      </div>
      <!-- END section register -->
    </div>
  </div>
</div>
`;