'use strict';
//http://proccli.com/2013/10/angularjs-geolocation-service
//This seems wonky compared to the USGS data service.
//Can I just use a promise here like I do with that service?
//Can I make this a service and not a factory ? 
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
