'use strict';

angular.module('gw2.game')

  .controller('BaseCtrl', function ($scope, calculator) {
    var ctrl = this;

    ctrl.init = function () {
      // prepare a root object that will serve to share things between child
      // scopes
      $scope.shared = {
        profession: null,       // current profession
        stats: null             // calculated stats
      };

      // bind directly to the calculator
      $scope.shared.stats = calculator.stats;
    };

    ctrl.init();
  });
