console.log("userController");
app.controller('userController', ['$scope','userFactory','$location', '$cookies', function($scope, userFactory, $location, $cookies) {
    if($cookies.get('user_id') == undefined){ 
        $location.url('/');
    }

$scope.register = function(){
    userFactory.register($scope.user, function(data){
      if (data.data.errors){
        $scope.errors = data.data.errors;
      }
      else{
        $cookies.put('user_id', data.data._id);
        $location.url('appointment');
      }
    });
  }

$scope.login = function(){
    userFactory.login($scope.userLogin, function(data){
        if(data.data.errors){
          $scope.errors = data.data.errors;
        }
        else{
          $cookies.put('user_id', data.data._id);
          $location.url('appointment');
        }
      },
      function(err){
        console.log("Error",err);
      });
  }
  
$scope.logout = function(){
   console.log("inside logout");
      userFactory.logout($scope.user, function(data){
        $cookies.remove('user_id');
        $location.url('/');
      });
    }
     
}]);