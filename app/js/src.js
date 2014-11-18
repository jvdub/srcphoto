$(function () {
	$(document).scroll(function() {
		var scrollPos = $(window).scrollTop(),
			max = $(document).height() - $(window).height(), // Max avilable scroll position
			header = $('#nav');

		header.css('opacity', 1 - (scrollPos / max));
	});
});