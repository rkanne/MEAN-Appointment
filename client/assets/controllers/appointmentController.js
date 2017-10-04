console.log("appointment Controller");
app.controller('appointmentController', ['$scope','appointmentFactory','$location', '$cookies', function($scope, appointmentFactory, $location, $cookies) {
    if($cookies.get('user_id') == undefined){ 
        $location.url('/');
    }

    $scope.date = {};
    $scope.user_id = $cookies.get('user_id');

    var today = new Date();
    $scope.today = today.toISOString().substring(0,10);
    // console.log($scope.today);

    $scope.get_appointments = function(){
        appointmentFactory.get_appointments(function(data){
            // console.log(data)
            $scope.appointments = data;
        });
    }

    $scope.get_appointments();

    $scope.new_appointment = function(){
        $location.url('/new_appointment');
    }

    $scope.add_appointment = function(){
        console.log("I am inside add appointment")
        // console.log("Time----------", $scope.appointment.time);

        if($scope.appointment === undefined){
            $scope.errors = "**** Please enter your information!!!!";
        }
        else{
            $scope.date.validation = $scope.appointment.date;
            $scope.date.user_id = $cookies.get('user_id');
            $scope.date.time = $scope.appointment.time
            appointmentFactory.get_appointments(function(data){
                // console.log(data)
                $scope.appointments = data;
            })
            console.log("False", $scope.date)
            appointmentFactory.checkdate($scope.date, function(data){
                if(data === true){
                    console.log("I can make appointment!!");
                    $scope.appointment._user = $scope.user_id;
                    appointmentFactory.create($scope.appointment, function(data){
                       if(data.data){
                            $scope.errors = data.data;
                            console.log("Error !!!!");
                           
                        }else{
                            $location.url('/appointment');
                        }
                    });
                }else{
                    $scope.errors = data.errors.validation.message;
                    console.log("False!!!!!!!")
                }
            })
       }
    }

    $scope.remove = function(user_id, appointment_id){
        if($scope.user_id == user_id){
            appointmentFactory.remove(appointment_id, function(data){
                if(data){
                    $scope.messages = data.errors.validation.message;
                    console.log("---Error---", $scope.messages);
                   
                }else{
                    $location.url('/appointment');
                }
            });
        }
        $scope.get_appointments();
    }
}]);
