'use strict';

angular.module('gw2.core.lodash', [])

  .factory('_', function ($window) {
    return $window._;
  });
