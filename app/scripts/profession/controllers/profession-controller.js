'use strict';

angular.module('gw2.profession')

  .controller('ProfessionCtrl', function ($scope, calculator, game) {
    var ctrl = this;

    /**
     * Initializes this controller
     */
    ctrl.init = function () {
      // expose profession list
      $scope.professions = game.professions;
    };

    /**
     * Sets the current profession, and update stats accordingly
     *
     * @param {Object} profession
     */
    $scope.setProfession = function (profession) {
      $scope.shared.profession = profession;
      calculator.setProfession(profession);
      calculator.update();
    };

    ctrl.init();
  });
