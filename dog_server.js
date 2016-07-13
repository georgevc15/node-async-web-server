var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var port = process.env.PORT || 3001;

if(port === 3001) {
	mongoose.connect('mongodb://localhost/dogs');
} else {
    mongoose.connect('mongodb://dog_usr:parola_dog@ds011785.mlab.com:11785/dog-db');
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
};
app.use(allowCrossDomain);
*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var dogRoutes = require('./routes/dog.js')(app);

var server = app.listen(port, function() {
	console.log("Server running on port "+port);
});