
angular.module('RoomyApp.services',[])
   .factory('Equipements',function($resource){
    return $resource('https://testroomie.herokuapp.com/equipements/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});