'use strict';

angular.module('quakelocatorApp')
  .service('ParseEarthquakeData', function ParseEarthquakeData() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
    this.parseData = function(data, user_latitude, user_longitude) {
      var quakes = [];
      data.features.map(function(feature){
        var quake = {coords:{}};
        quake.magnitude = feature.properties.mag;
        quake.coords.longitude = feature.geometry.coordinates[0];
        quake.coords.latitude = feature.geometry.coordinates[1];
        quake.depth = feature.geometry.coordinates[2];
        quake.place = feature.properties.place;
        quake.distance = self.calc_distance(user_latitude, user_longitude, quake.coords.latitude, quake.coords.longitude);
        quakes.push(quake);
      });
      console.log(quakes);
      return quakes;
    }
    this.calc_distance = function(lat1,lon1,lat2,lon2) {
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
