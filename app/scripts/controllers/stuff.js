'use strict';

angular.module('gw2craftApp')
  .controller('StuffCtrl', function ($scope, $http, _, calculator) {

    // load professions
    $http.get('data/professions.json').success(function(data) {
      $scope.professions = data;
    });

    // holds all character stats
    $scope.stats = {};

    /**
     * Sets the current profession to the given one, and refreshes stats
     * @param  {Object} profession
     */
    $scope.setProfession = function(profession) {
      calculator.profession = profession;
      $scope.stats = calculator.update();
    };

  });
