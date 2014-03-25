'use strict';

angular.module('quakelocatorApp', ['geolocation'])
  .controller('MainCtrl', function ($scope, $window, $http, geolocation) {
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
      $scope.map.data = $scope.parse_data(data, $scope.map.center.latitude, $scope.map.center.longitude);
    }

    //This can be made into a service along with the distance calculation functions.
    $scope.parse_data = function(data, latitude, longitude) {
      var quakes = [];
      data.features.map(function(feature){
        var quake = {coords:{}};
        quake.magnitude = feature.properties.mag;
        quake.coords.longitude = feature.geometry.coordinates[0];
        quake.coords.latitude = feature.geometry.coordinates[1];
        quake.depth = feature.geometry.coordinates[2];
        quake.place = feature.properties.place;
        quake.distance = $scope.calc_distance(latitude, longitude, quake.coords.latitude, quake.coords.longitude);
        quakes.push(quake);
      });
      console.log(quakes);
      return quakes;
    }

    $scope.calc_distance = function(lat1,lon1,lat2,lon2) {
        function deg2rad(deg) {
          return deg * (Math.PI/180);
        }
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return Math.floor(d);
    }




  });
