'use strict';
//https://stackoverflow.com/questions/12505760/angularjs-processing-http-response-in-service
//https://gist.github.com/jasonmcleod/5814979
angular.module('quakelocatorApp')
  .service('usgsearthquakeservice',[ '$http', '$rootScope', function usgsearthquakeservice($http, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      fetch: function() {
        var promise = $http.get('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp').then(function(response){
          console.log(response);
        });
        return promise;
      }
    }
  }]);
