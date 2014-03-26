'use strict';

angular.module('quakelocatorApp', ['geolocation'])
  .controller('MainCtrl', function ($scope, $window, $http, geolocation, ParseEarthquakeData) {
    //Get the users location
    geolocation.getLocation().then(function(data){
      $scope.latitude = data.coords.latitude;
      $scope.longitude = data.coords.longitude;
      console.log(data.coords.latitude, data.coords.longitude);
      $scope.get_quakes();
    });

    $scope.get_quakes = function() {
      var url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
      $http.jsonp(url);
    }

    $window.eqfeed_callback = function(data) {
      $scope.data = ParseEarthquakeData.parseData(data, $scope.latitude, $scope.longitude);
    }
  });
