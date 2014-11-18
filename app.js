var express = require('express'),
	connect = require('connect'),
	errorHandler = require('errorhandler'),
    connectTimeout = require('connect-timeout'),
    busboy = require('connect-busboy'),
    methodOverride = require('method-override'),
	http = require('http'),
	path = require('path'),
	app = express(),
	photo = require('./server/photo');

// General app configuration
app.set('port', process.env.PORT || 5001);
app.engine('html', require('ejs').renderFile);
app.use(connect.favicon('app/img/favicon.ico'));
app.use(connect.cookieParser());
app.use(busboy());
app.use(connect.json());
app.use(connect.urlencoded());
app.use(connect.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }))
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/app/js'));
app.use('/css', express.static(__dirname + '/app/css'));
app.use('/img', express.static(__dirname + '/app/img'));
app.use('/lib', express.static(__dirname + '/bower_components'));
app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist'));

// Define the different routes we support
app.route('/')
	.get(function (req, res) {
		res.render('../app/index.html');
	});

app.route('/photos/gallery')
	.get(photo.getGallery);

// Indicate any other api requests are not implemented
app.all('/v1/*', function (req, res, next) {
	res.writeHead(501);
	res.end();
});

// app.all('/*', loadUser);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});