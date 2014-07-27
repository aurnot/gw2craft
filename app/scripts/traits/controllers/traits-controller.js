'use strict';

angular.module('gw2.traits')

  .controller('TraitsCtrl', function ($scope) {
    if (!$scope.shared.profession) {
      return;
    }

    angular.forEach($scope.shared.profession.traits, function (trait) {
      console.log(trait);
    })
  });
