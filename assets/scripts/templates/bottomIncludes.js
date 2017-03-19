templates.bottomIncludes =
`
<script>
  if (typeof module === 'object') {
    window.module = module; module = undefined;
  }
</script>
<script src="assets/global/vendor/jquery/jquery.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/bootstrap/bootstrap.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/animsition/animsition.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/asscroll/jquery-asScroll.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/jquery-scrollbar/jquery.scrollbar.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/mousewheel/jquery.mousewheel.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/asscrollable/jquery.asScrollable.all.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/ashoverscroll/jquery-asHoverScroll.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/waves/waves.min.js" type="text/javascript"></script>
<!-- Plugins -->
<script src="assets/global/vendor/switchery/switchery.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/intro-js/intro.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/screenfull/screenfull.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/slidepanel/jquery-slidePanel.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/bootbox/bootbox.js" type="text/javascript"></script>
<script src="assets/global/vendor/jquery-validation/jquery.validate.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/jquery-validation/additional-methods.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/bootstrap-toastr/toastr.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/bootstrap-select/bootstrap-select.min.js"> type="text/javascript"</script>
<script src="assets/global/vendor/sweetalert2/sweetalert2.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/jquery-qrcode/jquery.qrcode.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/clipboard/clipboard.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/asprogress/jquery-asProgress.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/jquery-labelauty/jquery-labelauty.js" type="text/javascript"></script>
<script src="assets/global/vendor/alertify-js/alertify.js" type="text/javascript"></script>
<script src="assets/global/vendor/nprogress/nprogress.js" type="text/javascript"></script>
<script src="assets/global/vendor/ladda-bootstrap/spin.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/ladda-bootstrap/ladda.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/datatables/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/datatables-fixedheader/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="assets/global/vendor/datatables-bootstrap/dataTables.bootstrap.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/datatables-responsive/dataTables.responsive.js" type="text/javascript"></script>
<script src="assets/global/vendor/datatables-tabletools/dataTables.tableTools.js" type="text/javascript"></script>
<script src="assets/global/vendor/underscore-js/underscore-min.js" type="text/javascript"></script>
<script src="assets/global/vendor/javascript-md5/md5.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/bluebird/bluebird.min.js" type="text/javascript"></script>
<script src="assets/global/vendor/socket.io.js" type="text/javascript"></script>
<!-- Crypto Dependencies -->
<script src="assets/scripts/wordlist.js" type="text/javascript"></script>
<script src="assets/scripts/passphrasegenerator.js" type="text/javascript"></script>
<script src="assets/scripts/seedrandom.js" type="text/javascript"></script>
<!-- Scripts -->
<script src="assets/global/js/core.js" type="text/javascript"></script>
<script src="assets/js/site.js" type="text/javascript"></script>
<script src="assets/js/sections/menu.js" type="text/javascript"></script>
<script src="assets/js/sections/menubar.js" type="text/javascript"></script>
<script src="assets/js/sections/sidebar.js" type="text/javascript"></script>
<script src="assets/global/js/configs/config-colors.js" type="text/javascript"></script>
<script src="assets/js/configs/config-tour.js" type="text/javascript"></script>
<script src="assets/global/js/components/asscrollable.js" type="text/javascript"></script>
<script src="assets/global/js/components/nprogress.min.js" type="text/javascript"></script>
<script src="assets/global/js/components/animsition.js" type="text/javascript"></script>
<script src="assets/global/js/components/slidepanel.js" type="text/javascript"></script>
<script src="assets/global/js/components/bootbox.js" type="text/javascript"></script>
<script src="assets/global/js/components/switchery.js" type="text/javascript"></script>
<script src="assets/global/js/components/tabs.js" type="text/javascript"></script>
<script src="assets/global/js/components/buttons.js" type="text/javascript"></script>
<script src="assets/global/js/components/ladda-bootstrap.js" type="text/javascript"></script>
<script src="assets/global/js/components/asprogress.min.js" type="text/javascript"></script>
<script src="assets/global/js/components/jquery-labelauty.min.js" type="text/javascript"></script>
<script src="assets/global/js/components/alertify-js.js" type="text/javascript"></script>
<script src="assets/global/js/components/panel.min.js" type="text/javascript"></script>
<script src="assets/scripts/config.js" type="text/javascript"></script>
<script src="assets/scripts/checkie.js" type="text/javascript"></script>

<!-- Iguana API Scripts -->
<script src="assets/scripts/iguana_api.js" type="text/javascript"></script>
<script src="assets/scripts/iguana_api/IguanaUnused.js" type="text/javascript"></script>
<script src="assets/scripts/iguana_api/IguanaHandle.js" type="text/javascript"></script>
<script src="assets/scripts/iguana_api/IguanaAddcoin.js" type="text/javascript"></script>
<script src="assets/scripts/iguana_api/IguanaEDEX.js" type="text/javascript"></script>
<script src="assets/scripts/iguana_api/IguanaDEX.js" type="text/javascript"></script>
<script src="assets/scripts/iguana_api/IguanaShepherd.js" type="text/javascript"></script>
<script src="assets/scripts/iguana_api/IguanaJumblr.js" type="text/javascript"></script>
<!-- End Iguana API Scripts -->

<script src="assets/scripts/login.js" type="text/javascript"></script>
<!-- Dashboard Scripts -->
<script src="assets/scripts/dashboard.js" type="text/javascript"></script>
<script src="assets/scripts/dashboard/DashboardEDEX.js" type="text/javascript"></script>
<script src="assets/scripts/dashboard/DashboardDEX.js" type="text/javascript"></script>
<script src="assets/scripts/dashboard/DashboardBasilisk.js" type="text/javascript"></script>
<script src="assets/scripts/dashboard/DashboardCoinFiat.js" type="text/javascript"></script>
<!-- End Dashboard Scripts -->

<!--<script src="assets/scripts/coinwallets.js" type="text/javascript"></script>-->
<script src="assets/scripts/jumblr.js" type="text/javascript"></script>
<script src="assets/scripts/sidebar.js" type="text/javascript"></script>
<script src="assets/scripts/walletsettings.js" type="text/javascript"></script>
<script src="assets/scripts/atomicexplorer.js" type="text/javascript"></script>

<!-- Native KMD Wallet Scripts -->
<script src="assets/scripts/kmd_wallet/KMDWalletDashboard.js" type="text/javascript"></script>
<script src="assets/scripts/kmd_wallet/KMDInit.js" type="text/javascript"></script>
<script src="assets/scripts/kmd_wallet/KMDBalance.js" type="text/javascript"></script>
<script src="assets/scripts/kmd_wallet/KMDGetinfo.js" type="text/javascript"></script>
<script src="assets/scripts/kmd_wallet/KMDTransaction.js" type="text/javascript"></script>
<script src="assets/scripts/kmd_wallet/KMDTransactionInfo.js" type="text/javascript"></script>
<script src="assets/scripts/kmd_wallet/KMDAddress.js" type="text/javascript"></script>
<script src="assets/scripts/kmd_wallet/KMDSendTx.js" type="text/javascript"></script>
<script src="assets/scripts/kmd_wallet_dashboard.js" type="text/javascript"></script>
<!-- End Native KMD Wallet Scripts -->

<!-- Multilang Scripts -->
<script src="assets/scripts/lang.js" type="text/javascript"></script>
<script src="assets/scripts/lang/en.js" type="text/javascript"></script>
<!-- End Multilang Scripts -->

<script type="text/javascript">
  (function(document, window, $) {
    'use strict';
    var Site = window.Site;
    $(document).ready(function() {
      Site.run();

      var socket = io.connect('http://localhost:17777');
      socket.on('connect', function(data) {
        socket.emit('join', 'EDEX GUI joined');
      });
      socket.on('messages', function(data) {
        console.log(data);
      });

      lang();
    });
  })(document, window, jQuery);

  jQuery(document).ready(function() {
    jQuery('.scrollbar-dynamic').scrollbar();
  });
</script>
`;