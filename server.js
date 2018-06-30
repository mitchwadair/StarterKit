var http = require('http');
var url = require('url');
var fs = require('fs');
var aws = require('aws-sdk');

//var credentials = fs.readFileSync("localTestingAccessKey.txt").toString().split("\n");
/*var options = {
    accessKeyId: credentials[0].trim(),
    secretAccessKey: credentials[1].trim(),
    region: 'us-east-2'
};*/
var dynamoDB = new aws.DynamoDB(options = {region: "us-east-2"});

var port = process.env.port || 8081;

http.createServer(function(req, res) {

    var page = "." + url.parse(req.url, true).pathname;

    console.log(page);

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
        if (page == "./dbtest") {
            console.log("Access DB");
            var params = {
                TableName: "Kits",
                Key: {
                    "KitName": {
                        S: "TestKit"
                    }
                }
            };
            dynamoDB.getItem(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("Error accessing DB");
                } else {
                    console.log("Got item: " + JSON.stringify(data));
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify(data));
                }
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
    }

}).listen(port);
