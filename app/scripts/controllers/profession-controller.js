'use strict';

angular.module('gw2craftApp')

  .controller('ProfessionCtrl', function ($scope, calculator, game) {
    var ctrl = this;

    /**
     * Initializes this controller
     */
    ctrl.init = function () {
      // expose profession list
      $scope.professions = game.professions;
    }

    /**
     * Sets the current profession, and update stats accordingly
     *
     * @param {Object} profession
     */
    $scope.setProfession = function (profession) {
      var isSame = ($scope.shared.profession && profession && $scope.shared.profession.id === profession.id);
      $scope.shared.profession = profession;
      calculator.profession = profession;

      // reset weapons on profession change
      // @todo move this inside service
      if (!isSame) {
        calculator.weapons.mainHandType = null;
        calculator.weapons.offHandType = null;
        calculator.weapons.mainHandSet = null;
        calculator.weapons.offHandSet = null;
      }

      calculator.update();
    };

    ctrl.init();
  });
