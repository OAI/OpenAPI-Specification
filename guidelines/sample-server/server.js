var fs = require('fs');
var createServer = require('http-server').createServer;

var server = createServer({ root: 'files', cors: true });

server.listen(8000);
