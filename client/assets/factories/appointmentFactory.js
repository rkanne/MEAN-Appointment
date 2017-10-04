console.log('appointment Factory!!');
app.factory('appointmentFactory', ['$http', function($http) {

var factory = {};

  function appointmentFactory(){
    var _this = this;
    
    this.get_appointments = function(callback){
        $http.get('/appointment').then(function(returned_data){
        callback(returned_data);
      });
    }

    this.create = function(data, callback){
        console.log("I am in side the create appointment", data);
        $http.post('/add_appointment', data).then(function(returned_data){
            callback(returned_data.data);
        })
    }
    this.checkdate = function(date, callback){
        console.log("I am in side the check date");
        $http.post('/checkdate', date).then(function(returned_data){
            console.log(returned_data.data);
            callback(returned_data.data); 
        });
    }
    this.remove = function(appointment_id, callback){
        $http.post(`/remove/${appointment_id}`).then(function(returned_data){
            callback(returned_data.data);
        })
    }
  };
  
  return new appointmentFactory;
}]);

