var r = require('request').defaults({
    json: true
});

var redis = require('redis');

if (process.env.REDISTOGO_URL) { //heroku
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
} else { //local
    var client = redis.createClient();
    client.select((process.env.NODE_ENV || 'development').length);
}


//var client = redis.createClient();

var async = require('async');

var port = process.env.PORT || 3002;
console.log("Variabila port din routes "+port);

   if(port == 3002) {
    var catServerLink = 'http://localhost:3000/cat';
    var dogServerLink = 'http://localhost:3001/dog';
   } else {
    var catServerLink = 'https://serene-plateau-90342.herokuapp.com/cat';
    var dogServerLink = 'https://evening-inlet-33905.herokuapp.com/dog';
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
             //doar serverul dog este cashuit  
            client.get(dogServerLink, function(error, dog){
                        if (error) {throw error; };
                        if(dog) {
                            callback(null, JSON.parse(dog));
                            //var rezultat = JSON.parse(dog);
                            //console.log(rezultat);

                        /*client.get('http://localhost:3001/dog', function(err, reply) {
                            console.log(reply);
                        });*/
                    console.log("iau info din redis cache!"); 

                        } else {
                            
                              r({uri: dogServerLink}, function(error, response, body) {
                                    if (error) {throw error;return};    
                                    if (!error && response.statusCode === 200) {
                                        //console.log(body.data);
                                        callback(null, body);
                                        client.set(dogServerLink, JSON.stringify(body), function(error, body){
                                                if (error) {throw error; };
                                                console.log("al doilea if scriu in cache!"); 
                                        
                                        });
                                } else {
                                    callback(response.statusCode);
                                    }
                                 });
                          
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