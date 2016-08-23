
angular.module('RoomyApp',['ui.router','RoomyApp.controllers','RoomyApp.services','ngResource','LocalStorageModule']);

angular.module('RoomyApp').config(function($stateProvider,$httpProvider){
    $stateProvider.state('home',{
        url:'/',
        templateUrl:'partials/pages/home.html',
        controller:'HomeController'
    }).state('login',{
       url:'/login',
       templateUrl:'partials/pages/login.html',
       controller:'LoginController'
    }).state('register',{
       url:'/register',
       templateUrl:'partials/pages/register.html',
       controller:'RegisterController'
    }).state('profile',{
       url:'/profile',
       templateUrl:'partials/pages/profile.html',
       controller:'ProfileController'
    }).state('logout',{
       url:'/logout',
       controller:'LogoutController'
    });
}).run(function($state){
   $state.go('home');
});
angular.module('RoomyApp').run(function($rootScope, localStorageService) {
    $rootScope.token = localStorageService.get('token');
    $rootScope.endpoint = "https://testroomie.herokuapp.com/";
});