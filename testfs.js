var http = require("http");
var fs = require("fs");
var url = require("url");
var mailer = require("nodemailer");

http.createServer(function (request, response) {
    var query = url.parse(request.url, true);
    var filename = "." + query.pathname;

    console.log(query.pathname);

    if (filename == "./email") {
        var queryData = query.query;
        var destinationEmail = queryData.sendTo;
        var subject = queryData.subject;
        var contentFile = queryData.contentFile
        var content = "";

        response.writeHead(200, {'Content-Type': 'text/html'});

        content = fs.readFileSync(contentFile).toString();

        var emailDetails = fs.readFileSync("emaildetails.txt").toString().split("\n");
        var transporter = mailer.createTransport( {
            service: 'gmail',
            auth: {
                user: emailDetails[0],
                pass: emailDetails[1],
            }
        });
        var mailOptions = {
            from: emailDetails[0],
            to: destinationEmail,
            subject: subject,
            text: content
        }
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log("Has a  problem: " + err.toString());
            } else {
                console.log("Email sent");
            }
        });

        response.write("Email has been sent to " + destinationEmail);
        response.end();
    } else {
        fs.readFile(filename, function(err, data) {
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/html'});
                return response.end("ERROR: 404 Page not found.");
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            return response.end();
        });
    }

}).listen(8080);
