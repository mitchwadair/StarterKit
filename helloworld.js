var http = require('http');
var mod = require('./testmodule');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("Hello World!<br>" + mod.message());
}).listen(80);
