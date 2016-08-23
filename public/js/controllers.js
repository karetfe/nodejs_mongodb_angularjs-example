
angular.module('RoomyApp.controllers',[]).controller('HomeController',function($scope, $http,$state,$stateParams) {
   
}).controller('AboutController',function($scope,$state,popupService,$window){

}).controller('ProfileController',function($scope,$state,popupService,$window, $http, localStorageService){
    //$scope.ed =[];
	//$scope.ex = [];
	$http({
		method: 'GET',
		url: $scope.endpoint + 'users/profile?token='+$scope.token,
	 }).then(function successCallback(response) {
		 
	  	
	  	$scope.username = response.data.username;
        $scope.password = response.data.password;
        $scope.email = response.data.email;
	  	$scope.adresse = response.data.adresse;
	  	$scope.id = response.data._id;
		
	}, function errorCallback(response) {

	});
    
}).controller('LogoutController',function($scope,$state,popupService,$window, $http, localStorageService){
    if($scope.token == null){
        $state.go('login', {}, {reload: true});
    }
    localStorageService.remove('token');
    $window.location.reload();
    $state.go('home', {}, {reload: true});

}).controller('LoginController', function($scope, $http, localStorageService, $state, $window) {
    if($scope.token){
        $state.go('home', {}, {reload: true});
    }
    $scope.login = function(){
        $http({
            method: 'POST',
            url: $scope.endpoint + 'authenticate',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			
            data: 'username=' + $scope.username + '&password='+$scope.password
			
        }).then(function successCallback(response) {
            if(response.data.success){
                localStorageService.set('token', response.data.token);
                $window.location.reload();
            }
        }, function errorCallback(response) {

        });
    };
}).controller('RegisterController',function($scope,$state,popupService,$window, $http, localStorageService){
    $scope.register = function(){ 
        $http({
            method: 'POST',
            url: $scope.endpoint + 'users/register',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'username=' + $scope.username + '&password='+$scope.password + '&email='+$scope.email + '&adresse='+$scope.adresse
         }).then(function successCallback(response) {
            $state.go('login', {}, {reload: true});
        }, function errorCallback(response) {

        });
    };

});