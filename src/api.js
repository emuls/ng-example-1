var fs = require('fs');

var exports = module.exports = {};

exports.fetchData = function(req, res){
    var key = req.params.key;
    var result;

    if(key) {
        console.log('Returning data for: ' + key);
    }

    var filePath = './api/' + key + '.json';
    fs.readFile(filePath, 'utf8', function(err, fileData) {
        if (err){
            console.log("Error loading data: " + err);
            res.status(404);
            res.send('No data found for key: ' + key);
            res.end();
        }else {
            console.log('Data File Read: ' + filePath);
            res.header('type', 'text/json');
            res.send(fileData);
            res.end();
        }
    });
};