$('#nav-easydex').on('click', function() {
	$('#section-dashboard').hide();
	$('#section-easydex').show();
	$('#section-about-iguana').hide();
});

$('#nav-about-iguana').on('click', function() {
	$('#section-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-about-iguana').show();
});