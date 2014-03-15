'use strict';

angular.module('quakelocatorApp',['google-maps'])
  .controller('MainCtrl', ['$scope', '$http', '$window', 'geolocationservice', function ($scope, $http, $window, geolocation) {

  //Get Location data
  $scope.get_location = function() {
    $scope.map = {
      center: {
        latitude: 0,
        longitude: 0
      },
      data: [{coords:{latitude: 100, longitude: 100}}],
      zoom: 8
    }
    //Get information from the Geolocation factory service
    var position = null;
    geolocation().then(function(position){
      $scope.map = {
        center: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        data: [{coords:{latitude: 100, longitude: 100}}],
        zoom: 8
      }
      $scope.get_quakes();
    }, function(reason){
      console.log('cant get location');
    });
  }

  $scope.get_quakes = function() {
    var url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
    $http.jsonp(url);
  }

  $window.eqfeed_callback = function(data) {
    $scope.map.data = $scope.parse_data(data, $scope.map.center.latitude, $scope.map.center.longitude);    
  }

  $scope.parse_data = function(data, latitude, longitude) {
    var quakes = [];
    data.features.map(function(feature){
        var quake = {coords:{}};
        quake.magnitude = feature.properties.mag;
        quake.coords.longitude = feature.geometry.coordinates[0];
        quake.coords.latitude = feature.geometry.coordinates[1];
        quake.depth = feature.geometry.coordinates[2];
        quake.place = feature.properties.place;
        quake.distance = calc_distance(latitude, longitude, quake.Latitude, quake.Longitude);
        quakes.push(quake);
    });
    console.log(quakes);
    return quakes;
  }
}]);

//Helper Functions

function calc_distance(lat1,lon1,lat2,lon2) {
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

function deg2rad(deg) {
    return deg * (Math.PI/180);
}
