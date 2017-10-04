var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'userController'

    })
    .when('/register',{
        templateUrl: 'partials/main.html',
        controller: 'userController'
    })
    .when('/login',{
        templateUrl: 'partials/main.html',
        controller: 'userController'
    })
    .when('/appointment', {
        templateUrl: 'partials/appointments.html',
        controller: 'appointmentController'
    })
    .when('/new_appointment', {
        templateUrl: 'partials/new_appointment.html',
        controller: 'appointmentController'
    })
    .when('/logout', {
        templateUrl: 'partials/main.html',
        controller: 'userController'
    })
})
