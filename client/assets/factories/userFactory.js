console.log('User Factory!!');
app.factory('userFactory', ['$http', function($http) {

  var users = [];
  var user = {};

  function userFactory(){
      var _this = this;
      this.index = function(data,callback){
        $http.get('/',data).then(callback);
      } 
      this.register = function(data,callback){
        $http.post('/register',data).then(callback);
      } 
      this.login = function(data, callback){
        $http.post('/login', data).then(callback);
      }
      this.logout = function(data, callback){
        $http.post('/logout', data).then(callback);
      } 
    }

  
  return new userFactory;
}]);
