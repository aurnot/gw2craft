'use strict';

angular.module('gw2.game')

  /**
   * @ngdoc service
   * @name  gw2.game.armory
   * @kind function
   *
   * @description
   * The `armory` service provides weapon and armor helpers and generators.
   *
   * ** Attributes **
   * - `helmets` (Array): List of available helmets.
   * - `shoulders` (Array): List of available shoulders.
   * - `chests` (Array): List of available chests.
   * - `gauntlets` (Array): List of available gauntlets.
   * - `leggings` (Array): List of available leggings.
   * - `boots` (Array): List of available boots.
   * - `accessories` (Array): List of available accessories.
   * - `amulets` (Array): List of available amulets.
   * - `backs` (Array): List of available back items.
   * - `rings` (Array): List of available rings.
   * - `weaponSets` (Array): List of available weapon sets (one-handed and
   *                         two-handed stats for every stats combinations).
   * - `weaponTypes` (Array): List of valid weapon types (sword, mace, staff,...)
   *
   *
   * @param  {[type]} $resource [description]
   * @param  {[type]} _         [description]
   * @return {[type]}           [description]
   */
  .factory('armory', function ($resource, _) {

    // stats that use regular values
    var regularStats = ['power', 'precision', 'toughness', 'vitality', 'ferocity', 'condDamage', 'healPower'];

    var buildWeapons = function(data) {
      var oneHanded = {
        id : data.id,
        name : data.name,
        slot : 'one-handed',
        stats : {}
      };
      var twoHanded = {
        id : data.id,
        name : data.name,
        slot : 'two-handed',
        stats : {}
      };

      if ('all' === data.primary) {
        // special case: small bonus to all stats
        _.each(regularStats, function(stat) {
          oneHanded.stats[stat] = 42;
          twoHanded.stats[stat] = 84;
        });
      } else {
        // generic case
        oneHanded.stats[data.major] = 94;
        oneHanded.stats[data.minor1] = 67;
        oneHanded.stats[data.minor2] = 67;
        twoHanded.stats[data.major] = 188;
        twoHanded.stats[data.minor1] = 134;
        twoHanded.stats[data.minor2] = 134;
      }

      return [oneHanded, twoHanded];
    };

    // ---- Public API ---------------------------------------------------------

    return {

      helmets : $resource('data/helmets.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),

      shoulders : $resource('data/shoulders.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),

      gauntlets : $resource('data/gauntlets.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),

      chests : $resource('data/chests.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),

      leggings : $resource('data/leggings.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),

      boots : $resource('data/boots.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),

      amulets : $resource('data/amulets.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),

      rings : $resource('data/rings.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),

      backs : $resource('data/backs.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),

      accessories : $resource('data/accessories.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),

      weaponSets : _.union(
        buildWeapons({
          id : 'berzerker',
          name : 'Berzerker - Zojja',
          major : 'power',
          minor1 : 'precision',
          minor2 : 'ferocity'
        }),
        buildWeapons({
          id : 'soldier',
          name : 'Soldier - Chorben',
          major : 'power',
          minor1 : 'toughness',
          minor2 : 'vitality'
        }),
        buildWeapons({
          id : 'valkyrie',
          name : 'Valkyrie - Stonecleaver',
          major : 'power',
          minor1 : 'vitality',
          minor2 : 'ferocity'
        }),
        buildWeapons({
          id : 'assassin',
          name : 'Assassin - Soros',
          major : 'precision',
          minor1 : 'power',
          minor2 : 'ferocity'
        }),
        buildWeapons({
          id : 'rampager',
          name : 'Rampager - Coalforge',
          major : 'precision',
          minor1 : 'power',
          minor2 : 'condDamage'
        }),
        buildWeapons({
          id : 'cavalier',
          name : 'Cavalier - Angchu',
          major : 'toughness',
          minor1 : 'power',
          minor2 : 'ferocity'
        }),
        buildWeapons({
          id : 'knight',
          name : 'Knight - Beigarth',
          major : 'toughness',
          minor1 : 'power',
          minor2 : 'precision'
        }),
        buildWeapons({
          id : 'settler',
          name : 'Settler - Leftpaw',
          major : 'toughness',
          minor1 : 'condDamage',
          minor2 : 'healPower'
        }),
        buildWeapons({
          id : 'sentinel',
          name : 'Sentinel - Tonn',
          major : 'vitality',
          minor1 : 'power',
          minor2 : 'toughness'
        }),
        buildWeapons({
          id : 'shaman',
          name : 'Shaman - Zintl',
          major : 'vitality',
          minor1 : 'condDamage',
          minor2 : 'healPower'
        }),
        buildWeapons({
          id : 'carrion',
          name : 'Carrion - Occam',
          major : 'condDamage',
          minor1 : 'power',
          minor2 : 'vitality'
        }),
        buildWeapons({
          id : 'dire',
          name : 'Dire - Mathilde',
          major : 'condDamage',
          minor1 : 'toughness',
          minor2 : 'vitality'
        }),
        buildWeapons({
          id : 'rabid',
          name : 'Rabid - Grizzlemouth',
          major : 'condDamage',
          minor1 : 'precision',
          minor2 : 'toughness'
        }),
        buildWeapons({
          id : 'apothecary',
          name : 'Apothecary - Ebonmane',
          major : 'healPower',
          minor1 : 'toughness',
          minor2 : 'condDamage'
        }),
        buildWeapons({
          id : 'cleric',
          name : 'Cleric - Theodosus',
          major : 'healPower',
          minor1 : 'power',
          minor2 : 'toughness'
        }),
        buildWeapons({
          id : 'magi',
          name : 'Magi - Hronk',
          major : 'healPower',
          minor1 : 'precision',
          minor2 : 'vitality'
        }),
        buildWeapons({
          id : 'celestial',
          name : 'Celestial - Wupwup',
          major : 'all'
        })
      ),

      weaponTypes : $resource('data/weaponTypes.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }).query(),
    };
  });
