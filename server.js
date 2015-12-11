// Main Dish
var express = require('express');

// Start a new server, set it up and return it.
module.exports.init = function(){

	// Boing
	var server = express();

	// Let front-end do the routing for legit routes
	var legitRoutes = ['/', '/show/:id'];

	// register those routes
	server.get(legitRoutes, function(req, res){
		res.sendFile('index.html', { root: 'public' });
	});

	// Serve static files
	server.use(express.static('public'));

	// 404
	server.use(function(req, res){

		// serve main page if html is accepted
		if (req.accepts('html')) return res.status(404).sendFile('index.html', { root: 'public' });

		// otherwise simply send a 404
		res.status(404).end();
	});

	return server;
};

