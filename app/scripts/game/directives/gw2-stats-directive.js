'use strict';

angular.module('gw2.game.stats', [])

  .directive('gw2Stats', function () {
    return {
      scope: {
        stats: '='
      },
      templateUrl : 'views/game/directives/gw2-stats-directive.html'
    };
  });
