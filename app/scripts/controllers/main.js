'use strict';

angular.module('quakelocatorApp', ['geolocation'])
  .controller('MainCtrl', function ($scope, $window, $http, geolocation, ParseEarthquakeData) {
    //Setup our data structure
    $scope.map = {
      data: [],
      center: {
        latitude: '',
        longitude: ''
      }
    }

    //Get the users location
    geolocation.getLocation().then(function(data){
      $scope.coords = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      }
      console.log($scope.coords)
      $scope.get_quakes();
    });

    $scope.get_quakes = function() {
      var url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
      $http.jsonp(url);
    }

    $window.eqfeed_callback = function(data) {
      //$scope.map.data = $scope.parse_data(data, $scope.map.center.latitude, $scope.map.center.longitude);
      $scope.map.data = ParseEarthquakeData.parseData(data, $scope.map.center.latitude, $scope.map.center.longitude);
    }
  });
