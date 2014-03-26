'use strict';

angular.module('quakelocatorApp', ['google-maps','geolocation'])
  .controller('MainCtrl', function ($scope, $window, $http, geolocation, ParseEarthquakeData) {
    //Get the users location
    $scope.map = {
      center: {
        latitude: 0,
        longitude: 0
      },
      zoom: 8,
      quakes: []
    }
    $scope.data = [];
    geolocation.getLocation().then(function(data){
      $scope.map.center.latitude = data.coords.latitude;
      $scope.map.center.longitude = data.coords.longitude;
      console.log(data.coords.latitude, data.coords.longitude);
      $scope.get_quakes();
    });

    $scope.get_quakes = function() {
      var url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
      $http.jsonp(url);
    }

    $window.eqfeed_callback = function(data) {
      $scope.map.quakes = ParseEarthquakeData.parseData(data, $scope.map.center.latitude, $scope.map.center.longitude);
    }
  });
