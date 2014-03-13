'use strict';

angular.module('quakelocatorApp')
  .service('usgsearthquakeservice', function usgsearthquakeservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.eqfeed_callback = function(data) {
        return data;
    }
    return function() {
        console.log('test'); 
    }
  });
