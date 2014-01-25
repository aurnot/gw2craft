'use strict';

describe('Controller: StuffCtrl', function () {

  // load the controller's module
  beforeEach(module('gw2craftApp'));

  var StuffCtrl,
    httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($httpBackend, $controller, $rootScope) {
    httpBackend = $httpBackend;
    httpBackend.expectGET('data/professions.json')
      .respond([
        { id : 'professionA', name : 'Profession A', defense : 1000, health : 2000 },
        { id : 'professionB', name : 'Profession B', defense : 800, health : 1000 }
      ]);

    scope = $rootScope.$new();
    StuffCtrl = $controller('StuffCtrl', {
      $scope: scope
    });
  }));

  it('should fetch professions from xhr', function () {
    expect(scope.professions).toBeUndefined();
    httpBackend.flush();
    expect(scope.professions.length).toBe(2);
  });
});
