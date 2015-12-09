var server = require('./server');

var dscServer = server.init();

var port = process.env.PORT || 3000;
dscServer.listen(port, function(){
	console.log('Server is up! Listening on ' + port + '.');
});