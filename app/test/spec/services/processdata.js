'use strict';

describe('Service: Processdata', function () {

  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var Processdata;
  beforeEach(inject(function (_Processdata_) {
    Processdata = _Processdata_;
  }));

  it('should do something', function () {
    expect(!!Processdata).toBe(true);
  });

});
