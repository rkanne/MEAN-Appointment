console.log('user model');
// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    first_name: {
    	type: String, 
    	required: [true, "First name can not be blank"]
    },
    last_name: {
    	type: String, 
    	required: [true, "Last name can not be blank"]
    },
    username:  {
    	type: String, 
    	unique: true, 
    	required: [true, "Invalid Username"]
    },
    password:   {
    	type: String, 
    	required: [true, "Password can not be blank"]
    },
    appointments: [
        {type: Schema.Types.ObjectId, 
        ref: 'Appointment'}]
}, 
	{
		timestamps: true
	});

mongoose.model('User', userSchema);
