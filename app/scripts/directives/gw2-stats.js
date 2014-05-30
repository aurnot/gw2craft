'use strict';

angular.module('gw2craftApp')
  .directive('gw2Stats', function () {
    return {
      scope: {
        stats: '='
      },
      templateUrl : 'views/partials/gw2-stats.html'
    };
  });
