'use strict';

angular.module('gw2craftApp')
  .controller('StuffCtrl', function ($scope, $http, _) {
    console.log(_.contains([4, 8, 15, 16, 23, 42], 42));

    // load professions
    $http.get('data/professions.json').success(function(data) {
        $scope.professions = data;
    });

    // holds all character stats
    $scope.stats = {};

  });
