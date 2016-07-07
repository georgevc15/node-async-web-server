var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var petRoutes = require('./routes/pet.js')(app);

app.use(express.static('public')); //define root the root of our app

var port = process.env.PORT || 3002;

var server = app.listen(port, function() {
	console.log("Server running on port "+port);
});