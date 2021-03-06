var api = require('./api');
var express = require('../node_modules/express');
var app = express();
app.use('/', express.static('../DIST'));
app.get('/api/:key', (req, res) => api.fetchData(req, res));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Basic node server listening at http://%s:%s', host, port);
});
