var express = require('express');
var path = require("path");
// create the express app
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

require('./server/config/mongoose.js');
// var routes_setter = require('./server/config/routes.js');
require("./server/config/routes.js")(app);
// invoke the function stored in routes_setter and pass it the "app" variable
// routes_setter(app)

app.listen(8000, function(){});

