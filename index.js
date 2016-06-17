var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var port = process.env.PORT || 3000;

/*app.get('/', function(req,res) {
	res.send('welcome');
	//res.json({hello: 'world'});
})*/

var cats = require('./cats.js')(app);

var server = app.listen(port, function() {
	console.log("Server running on port 3000");
});
