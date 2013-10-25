//http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
angular.module('quakes', []);

function QuakeCtrl($scope, $http, $window) {
	$scope.data = null;

	$scope.get_location = function() {
		if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
            	$scope.latitude = position.coords.latitude;
            	$scope.longitude = position.coords.longitude;
            	$scope.get_quakes();
            });
        } else {
        	$scope.latitude = 47.6;
        	$scope.longitude = -122.3;
        	$scope.get_quakes();
        } 
	}

	$scope.get_quakes = function() { 
		var url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
		$http.jsonp(url)
	}

	$scope.remove_spinner = function() {
		$('.loading-spinner').hide();
	}

	$window.eqfeed_callback = function(data) {
		$scope.data = parse_data(data, $scope.latitude, $scope.longitude);
		$scope.data = _.sortBy($scope.data, function(quake){ return quake.Distance});
		$scope.remove_spinner();
	}

}

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
		if (quake.Distance < 30) {
			quake.Class = 'danger';
		} else if (quake.Distance > 31 && quake.Distance < 100) {
			quake.Class = 'warning'
		} else if (quake.Distance > 101) {
			quake.Class = 'info'
		}
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