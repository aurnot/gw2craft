'use strict';

angular.module('gw2craftApp')
  .factory('game', function($resource) {
    return {
      professions : $resource('data/professions.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query()
    };
  });
