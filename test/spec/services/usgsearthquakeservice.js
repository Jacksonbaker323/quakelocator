'use strict';

describe('Service: Usgsearthquakeservice', function () {

  // load the service's module
  beforeEach(module('quakelocatorApp'));

  // instantiate service
  var Usgsearthquakeservice;
  beforeEach(inject(function (_Usgsearthquakeservice_) {
    Usgsearthquakeservice = _Usgsearthquakeservice_;
  }));

  it('should do something', function () {
    expect(!!Usgsearthquakeservice).toBe(true);
  });

});
