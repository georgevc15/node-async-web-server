var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = process.env.PORT || 3001;

if(port === 3001) {
	mongoose.connect('mongodb://localhost/dogs');
	console.log("conectare locala");
} else {
    mongoose.connect('mongodb://dog_usr:parola_dog@ds011785.mlab.com:11785/dog-db');
	//console.log("Aici se va face conectarea cu heroku");
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var dogRoutes = require('./routes/dog.js')(app);

var server = app.listen(port, function() {
	console.log("Server running on port "+port);
});