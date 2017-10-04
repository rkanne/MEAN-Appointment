var mongoose = require('mongoose'),
    User = mongoose.model('User');
    Appointment = mongoose.model('Appointment');

function checkdateController() {
    var _this = this;
    this.checkdate = function(req, res){
        Appointment.find({date: req.body.validation}, function(err, date){
        //check date
            if(date.length < 3){
                Appointment.find({date: req.body.validation, time: req.body.time}, function(err, date){
                //check time
                if(date.length > 0){
                    res.json({
                        errors: {
                            validation: 
                            {
                            message: "** Time is not Available, Please choose different time!!!"
                            }
                        }
                    });
                }else{
                    Appointment.find({date: req.body.validation, _user: req.body.user_id}, function(err, date){
                    // check user_id
                        if(date.length > 0){
                            res.json({
                                    errors: {
                                        validation: 
                                        {
                                        message: "** Your have made appointment this day!! "
                                        }
                                    }
                                });
                        }else{
                             res.json(true); 
                        }
                    });
                }
                });
            }else{
                console.log('Not Available');
                res.json({
                    errors: {
                        validation: 
                        {
                            message: "** Appointment is not available!!"
                        }
                    }
                });
            }// end else
        });// end function
    }//create
}//checkdateController()

module.exports = new checkdateController();


