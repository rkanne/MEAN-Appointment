var mongoose = require('mongoose');

var Appointment = mongoose.model('Appointment');
var User = mongoose.model('User');

function appointmentController() {
    var _this = this;

    this.get_appointments = function(req, res){
        Appointment.find({}).populate('_user').exec(function(err, data){
            if(err){
                res.json(err);
            }
            else
            {
                res.json(data);
            }
        });
    },

    this.create = function(req, res){
        // console.log("Req.body---",req.body)
        Appointment.create(req.body, function(err, appointment){
            if(err){
                console.log("Error for creating Appointment", err);
                res.json(err);
            }else{
                User.findOne({_id: req.body._user}, function(err, user){
                    appointment._user = user._id;
                    appointment.save(function(err){
                        if(err){
                            console.log('Error for saving the appointment');
                            res.json(err);
                        }else{
                            user.appointments.push(appointment);
                            user.save(function(err){
                                if(err){
                                    console.log('Error for saving the user');
                                    res.json(err);
                                }else{
                                    User.find({}).populate('appointments').exec(function(err, users){
                                    res.json(users);
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    }

    this.remove = function(req, res){
        console.log("remove---",req.params.id);
        Appointment.findOne({_id: req.params.id}, function(err, date){
            var today_time = new Date().getTime();
            var today_date = new Date().toISOString().substring(0,10);

            var appointment_time = new Date(date.date).getTime();
            var appointment_date = date.date.toISOString().substring(0,10);

            // console.log("Today---Time---",today_time)
            // console.log("Today---Date---",today_date)

            // console.log("Appointment---Time---", appointment_time);
            // console.log("Appointment---Date---", appointment_date);

            var daysInMilli = 86400000;
            if(today_date == appointment_date){
                console.log("*** You can not cancel the appointment today!! Must be before 24 hours");
                res.json({
                        errors: {
                            validation: 
                            {
                            message: "*** You can not cancel your appointment today!! Must before 24 hours"
                            }
                        }
                    });
            }else{
                var differentTime = appointment_time - today_time;
                    if(daysInMilli >= differentTime){
                        console.log("You can not cancel the appointment!!");
                        console.log("differentTime------", differentTime);
                        console.log("daysInMilli------", daysInMilli);
                        if(err){
                            res.json(err);
                        }else{
                            console.log("*** You can not cancel the appointment!!");
                            res.json({
                                errors: {
                                    validation: 
                                        {
                                        message: "*** The cancellation must be canceled more than 24 hours before your appoiment start!!"
                                        }
                                }
                            });
                        }
                }else{
                    Appointment.remove({_id: req.params.id}, function(err, app){
                        if(err){
                            res.json(err);
                        }else{
                            console.log("*** You can cancel the appointment!!");
                            res.json({
                                errors: {
                                    validation: 
                                        {
                                        message: "*** You have cancelled your appointment"
                                        }
                                }
                            });
                        }
                    });
                }
            }
        });
    }
}
module.exports = new appointmentController();

