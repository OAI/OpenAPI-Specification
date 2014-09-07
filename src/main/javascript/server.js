var fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  fs.readFile("./schemas/v2.0" + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8000);