var fs = require('fs');

exports.getGallery = function (req, res, next) {
	var files = fs.readdir('app/img/gallery', function (err, files) {
		if (!err) {
			if (files.length) {
				res.writeHead(200, { 'content-type': 'text/json' });
				res.end(JSON.stringify(files));
			}
			else {
				res.writeHead(204);
			}
		}
		else {
			return next(err);
		}
	});
};