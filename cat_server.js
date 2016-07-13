var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');


var router = express.Router();

var port = process.env.PORT || 3000;

if(port === 3000) {
	mongoose.connect('mongodb://localhost/cats');
} else {
    mongoose.connect('mongodb://mongo_usr:mongo_pass@ds025603.mlab.com:25603/node-async');
	//console.log("Aici se va face conectarea cu heroku");
}


/*
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
 
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
};*/

//app.use(allowCrossDomain);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


/*app.get('/', function(req,res) {
	res.send('welcome');
	//res.json({hello: 'world'});
})*/


var cats = require('./routes/cat.js')(app);

var server = app.listen(port, function() {
	console.log("Server running on port "+port);
});