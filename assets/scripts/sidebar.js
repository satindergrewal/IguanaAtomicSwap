// DOM Ready =============================================================
$(document).ready(function() {

    $('#section-dashboard').show();
    $('#header-dashboard').show();
	$('#section-easydex').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( "" ).addClass( "active open" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );

});

$('#nav-dashboard').on('click', function() {
	$('#section-dashboard').show();
	$('#header-dashboard').show();
	$('#section-easydex').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( "" ).addClass( "active open" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
});

$('#nav-easydex').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').show();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( "" ).addClass( "active open" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
});

$('#nav-about-iguana').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-about-iguana').show();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( "" ).addClass( "active open" );
});

