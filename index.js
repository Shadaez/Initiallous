var restify = require('restify'),
	server = restify.createServer(),
	_ = require('underscore'),
	io = require('socket.io')

	server.listen(8080, function() {
		console.log('%s listening at %s', server.name, server.url);
	});

server.pre(restify.pre.sanitizePath());
server.use(restify.bodyParser());

server.get('/.*/', restify.serveStatic({
	directory: './public',
	default: 'index.html'
}));