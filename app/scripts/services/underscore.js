'use strict';

/**
 * The underscore lib, as a service.
 */
var underscore = angular.module('underscore', []);

underscore.factory('_', function() {
  return window._;    // assume underscore has already been loaded on the page
});
