'use strict';
//http://proccli.com/2013/10/angularjs-geolocation-service
angular.module('quakelocatorApp')
  .factory('geolocationservice', ['$q', '$window','$rootScope', function ($q, $window, $rootScope) {
    return function() {
      var d = $q.defer();
      if (!$window.navigator) {
        $rootScope.$apply(function(){
          d.reject(new Error('Geolocation is not supported'));
        });
      } else {
        $window.navigator.geolocation.getCurrentPosition(function(position){
          $rootScope.$apply(function(){
            d.resolve(position);
          });
        }, function(error) {
          $rootScope.$apply(function(){
            d.reject(error);
          });
        });
      }
      return d.promise;
    }
  }]);
