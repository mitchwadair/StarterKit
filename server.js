var http = require('http');
var url = require('url');
var fs = require('fs');

var port = process.env.port || 8081;

http.createServer(function(req, res) {

    var page = "." + url.parse(req.url, true).pathname;

    if (page == "./") {
        fs.readFile("./index.html", function(error, data) {
            if (error) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404<br>Page Not Found!");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        fs.readFile(page, function(error, data) {
            if (error) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404<br>Page Not Found!");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }

}).listen(port);
