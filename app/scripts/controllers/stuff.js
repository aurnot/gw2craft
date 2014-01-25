'use strict';

angular.module('gw2craftApp')
  .controller('StuffCtrl', function ($scope, $http, calculator, armory) {

    // load professions
    $http.get('data/professions.json').success(function(data) {
      $scope.professions = data;
    });

    // holds all character stats
    $scope.stats = {};

    // holds chosen armor pieces
    $scope.armor = {};

    // monitor armor changes and update stats accordingly
    $scope.$watch('armor', function() {
      calculator.armor = $scope.armor;
      $scope.stats = calculator.update();
    }, true);

    $scope.amulets = armory.amulets.query();
    $scope.rings = armory.rings.query();
    $scope.backs = armory.backs.query();
    $scope.accessories = armory.accessories.query();

    /**
     * Sets the current profession to the given one, and refreshes stats
     * @param  {Object} profession
     */
    $scope.setProfession = function(profession) {
      calculator.profession = profession;
      $scope.stats = calculator.update();
    };

    $scope.getItemsForSlot = function(slot) {
      return armory.getItemsForSlot(slot);
    };

  });
