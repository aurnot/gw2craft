'use strict';

angular.module('gw2.armor')

  .controller('ArmorCtrl', function ($scope, armory, calculator) {
    var ctrl = this;

    ctrl.init = function () {
      // bind directly to the calculator
      $scope.armor = calculator.armor;

      // expose armor pieces lists
      $scope.amulets = armory.amulets;
      $scope.rings = armory.rings;
      $scope.backs = armory.backs;
      $scope.accessories = armory.accessories;

      // monitor armor changes and update stats accordingly
      $scope.$watch('armor', function () {
        calculator.update();
      }, true);
    };

    /**
     * Gets a list of available items for the given slot
     *
     * @param {String} slot A valid armor slot
     * @returns {Array}
     */
    $scope.getItemsForSlot = function (slot) {
      return armory.getItemsForSlot(slot);
    };

    ctrl.init();
  });
