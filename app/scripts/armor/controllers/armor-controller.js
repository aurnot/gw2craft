'use strict';

angular.module('gw2.armor')

  .controller('ArmorCtrl', function ($scope, armory, calculator) {
    var ctrl = this;

    ctrl.init = function () {
      // bind directly to the calculator
      $scope.armor = calculator.armor;

      // expose armor pieces lists
      $scope.helmets = armory.helmets;
      $scope.shoulders = armory.shoulders;
      $scope.chests = armory.chests;
      $scope.gauntlets = armory.gauntlets;
      $scope.leggings = armory.leggings;
      $scope.boots = armory.boots;
      $scope.amulets = armory.amulets;
      $scope.rings = armory.rings;
      $scope.backs = armory.backs;
      $scope.accessories = armory.accessories;

      // monitor armor changes and update stats accordingly
      $scope.$watch('armor', function () {
        calculator.update();
      }, true);
    };

    ctrl.init();
  });
