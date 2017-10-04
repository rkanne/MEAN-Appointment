console.log('appointment model');
// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new mongoose.Schema({
    date: { 
    	type: Date, 
    	required: [true, "Date of appointment is required/Invalid Date."]
    },
    time: { 
    	type: Date, 
    	required: [true, "Time of appointment is required/Invalid Time."]
    },
    complain: {
    	type: String, 
    	minlength: 10, 
    	required: [true, "Complain is required."]
    },
    _user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },

}, {
	timestamps: true
	});

mongoose.model('Appointment', appointmentSchema);