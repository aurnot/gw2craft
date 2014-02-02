'use strict';

angular.module('gw2craftApp')
  .controller('TraitsCtrl', function ($scope, calculator) {

    $scope.stats = calculator.stats;

  });
