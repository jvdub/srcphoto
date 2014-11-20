(function ($) {
	'use strict';

	function getImages() {
		$.ajax({
			url: '/photos/gallery',
			type: 'GET',
			dataType: 'text',
			success: function (result) {
				var i,
					totalRows,
					row = 1;

				console.log('woot!');

				if (typeof result !== undefined) {
					result = JSON.parse(result);
					totalRows = Math.ceil(result.length / 3);

					for (i = 1; i < totalRows; ++i) {
						$('#portfolio-images').append($('<div class="row" id="portfolio-images-' + i + '"></div>'));
					}

					for (i = 0; i < result.length; ++i) {
						$('#portfolio-images-' + (row++ % totalRows)).append($([
							'<div class="col-xs-6 col-md-4">',
								'<a href="#" class="thumbnail">',
									'<img src="img/gallery/' + result[i] + '" alt="...">',
								'</a>',
							'</div>'
						].join('')));
					}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log('darn');
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}

	function setActiveTab() {
		var urlTab = window.location.hash;

		if (urlTab) {
			$('ul.nav > li.active').removeClass('active');
			$('ul.nav a[href="' + urlTab + '"]').parent().addClass('active');
			$('.parallax').scrollTop($(urlTab).scrollTop());
		}
		else {
			$('ul.nav a[href="#home"]').parent().addClass('active');
		}
	}

	function attachHandlers() {
		$('ul.nav a').click(function () {
			var $that = $(this);

			$('ul.nav > li.active').removeClass('active');
			$that.parent().addClass('active');
		});
	}

	$(function () {
		getImages();
		attachHandlers();
		setActiveTab();
	});
}(jQuery));