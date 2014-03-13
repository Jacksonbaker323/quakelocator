'use strict';

angular.module('quakelocatorApp',['google-maps'])
  .controller('MainCtrl', ['$scope', 'GeolocationService', function ($scope, geolocation) {

  //Get Location data
  $scope.get_location = function() {
    $scope.map = {
      center: {
        latitude: 0,
        longitude: 0
      },
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
        zoom: 8
      }
    }, function(reason){
      console.log('cant get location');
    });
  }
}]);



//Helper Functions

function parse_data(data, latitude, longitude) {
    var quakes = [];
    data.features.map(function(feature){
        var quake = {};
        quake.Magnitude = feature.properties.mag;
        quake.Longitude = feature.geometry.coordinates[0];
        quake.Latitude = feature.geometry.coordinates[1];
        quake.Depth = feature.geometry.coordinates[2];
        quake.Place = feature.properties.place;
        quake.Distance = calc_distance(latitude, longitude, quake.Latitude, quake.Longitude);
        quakes.push(quake);
    });
    return quakes;
}

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
