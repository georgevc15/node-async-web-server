var r = require('request').defaults({
    json: true
});

var async = require('async');


var port = process.env.PORT || 3002;
console.log("Variabila port din routes "+port);

   if(port == 3002) {
    var catServerLink = 'http://localhost:3000/cat';
    var dogServerLink = 'http://localhost:3001/dog';
   } else {
    var catServerLink = 'https://cryptic-lowlands-67233.herokuapp.com/cat';
    var dogServerLink = 'https://cryptic-lowlands-67233.herokuapp.com/dog';
   }


module.exports = function(app) {

    /* Read */
    app.get('/pets', function (req, res) {

        async.parallel({
            cat: function(callback){
                r({uri: catServerLink}, function(error, response, body) {
                    if (error) {
                        callback({service: 'cat', error: error});
                        return;
                    };
                    if (!error && response.statusCode === 200) {
                        callback(null, body);
                    } else {
                        callback(response.statusCode);
                    }
                });
            },
            dog: function(callback){
                r({uri: dogServerLink}, function(error, response, body) {
                    if (error) {
                        callback({service: 'dog', error: error});
                        return;
                    };
                    if (!error && response.statusCode === 200) {
                        callback(null, body);
                    } else {
                        callback(response.statusCode);
                    }
                });
            }
        },
        function(error, results) {
            res.json({
                error: error,
                results: results
            });
        });

    });

};