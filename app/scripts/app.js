'use strict';

angular.module('gw2craftApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'underscore'
])

  .config(function ($stateProvider, $urlRouterProvider) {
    // default url
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('base', {
        url: '/',
        templateUrl: '/views/base.html',
        controller: 'BaseCtrl'
      })

      .state('base.profession', {
        url: 'profession',
        views: {
          content: {
            templateUrl: '/views/profession/profession.html',
            controller: 'ProfessionCtrl'
          }
        }
      })
      .state('base.armor', {
        url: 'armor',
        views: {
          content: {
            templateUrl: '/views/armor/armor.html',
            controller: 'ArmorCtrl'
          }
        }
      })
      .state('base.weapons', {
        url: 'weapons',
        views: {
          content: {
            templateUrl: '/views/weapon/weapon.html',
            controller: 'WeaponCtrl'
          }
        }
      })
    ;
  });
