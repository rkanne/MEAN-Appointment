var path = require('path');
var users = require('./../controllers/users.js');
var appointments = require('./../controllers/appointments.js');
var checkdate = require('./../controllers/checkdate.js');

module.exports = function(app) {
	app.get('/', users.index);
  	app.post('/login', users.login);
  	app.post('/logout', users.logout);
	app.post('/register', users.register);
	app.get('/appointment', appointments.get_appointments);
    app.post('/add_appointment', appointments.create);
    app.post('/checkdate', checkdate.checkdate);
    app.post('/remove/:id', appointments.remove);
}