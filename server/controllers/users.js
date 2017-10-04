var mongoose = require('mongoose'),
    User = mongoose.model('User');

function userController() {
    var _this = this;
    this.index = function(req, res) {
        res.json({
            future: 'index'
        });
    };
    this.logout = function(req, res) {
        res.json({
            future: 'logout'
        });

    }
    this.login = function(req, res) {
       // console.log("-----username----", req.body);
        if(req.body.username === undefined || req.body.password === undefined){
            res.json({
                errors: {
                    login_reg: {
                        message: "Username and/or Password is required!"
                    }
                }
            });
        }// if
        if(req.body.username != undefined || req.body.password != undefined){        
            User.findOne({username: req.body.username}, function(err, data) {
            if(err){
                res.json({
                    errors: {
                        login_reg: {
                            message: "Username and/or Password is required!"
                        }
                    }
                });  
            }else{
                // console.log("-------null----", data);
                if(data === null){
                    res.json({
                        errors: {
                            login_reg: {
                                message: "Username and/or Password is invalid!"
                            }
                        },
                        name: "Validation error"
                    });
                }else{
                	res.json({_id: data._id});
                }
            }
        })
        }
    }

    this.register = function(req, res) {
        var user = new User(req.body);
        user.save(function(err, newuser) {
            if (err){
              res.json(err);
            }
            else{
            res.json({
                _id: newuser._id
            });
          }
        });
    }
}

module.exports = new userController();