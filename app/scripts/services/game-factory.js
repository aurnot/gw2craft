'use strict';

angular.module('gw2craftApp')
  .factory('game', function ($resource, _) {
    var professions = $resource('data/professions.json', {}, {
      query : { method : 'GET', params : {}, isArray : true }
    }).query();

    /**
     * Checks if a profession can wield a weapon in the given hand
     *
     * @param  {Object} profession
     * @param  {Object} weapon
     * @param  {String} hand
     * @return {Boolean}
     */
    var professionCanWieldWeapon = function(profession, weapon, hand) {
      if ('main-hand' === hand) {
        return _.contains(profession.mainHand, weapon.id);
      } else if ('off-hand' === hand) {
        return _.contains(profession.offHand, weapon.id);
      }

      return false;
    };

    return {
      professions : professions,
      professionCanWieldWeapon : professionCanWieldWeapon
    };
  });
