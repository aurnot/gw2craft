'use strict';

angular.module('gw2.game')

  /**
   * @ngdoc service
   * @name gw2.game.game
   * @kind function
   *
   * @description
   * The `game` service is responsible for handling high-level game rules and
   * functions.
   *
   * ** Attributes **
   * - `professions` (Array): The available professions.
   *
   * ** Methods **
   * - `professionCanWieldWeapon`: Checks if the given profession can wield the
   *                               given weapon.
   *
   * @requires $resource
   * @requires _
   */
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

    // ---- Public API ---------------------------------------------------------

    return {
      professions : professions,
      professionCanWieldWeapon : professionCanWieldWeapon
    };
  });
