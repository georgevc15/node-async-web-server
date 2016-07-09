var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var cors = require('cors');

var port = process.env.PORT || 3000;

if(port === 3000) {
	mongoose.connect('mongodb://localhost/cats');
} else {
    mongoose.connect('mongodb://mongo_usr:mongo_pass@ds025603.mlab.com:25603/node-async');
	//console.log("Aici se va face conectarea cu heroku");
}


//app.use(cors());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(allowCrossDomain);


/*app.get('/', function(req,res) {
	res.send('welcome');
	//res.json({hello: 'world'});
})*/


var cats = require('./routes/cat.js')(app);

var server = app.listen(port, function() {
	console.log("Server running on port "+port);
});