//http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
angular.module('quakes', []);

function QuakeCtrl($scope, $http) {
	$scope.data = null;
	$scope.get_quakes = function() {
		//$scope.Quakes = Restangular.all('all_day.geojsonp').getList();
		var url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
		$http.jsonp(url)
	}

	window.eqfeed_callback = function(data) {
		$scope.data = data;
		console.log($scope.data);
		parse_data($scope.data);
	}

}

function parse_data(data) {
	var quakes = [];
	data.features.map(function(feature){
		var quake = {};
		quake.Magnitude = feature.properties.mag;
		quake.Longitude = feature.geometry.coordinates[0];
		quake.Latitude = feature.geometry.coordinates[1];
		quake.Depth = feature.geometry.coordinates[2];
		quake.Place = feature.properties.place;
		quakes.push(quake);
	});
	console.log(quakes);
}