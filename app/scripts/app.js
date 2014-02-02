'use strict';

angular.module('gw2craftApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'underscore'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/stuff', {
        templateUrl: 'views/stuff.html',
        controller: 'StuffCtrl'
      })
      .when('/traits', {
        templateUrl: 'views/traits.html',
        controller: 'TraitsCtrl'
      })
      .otherwise({
        redirectTo: '/stuff'
      });
  });
