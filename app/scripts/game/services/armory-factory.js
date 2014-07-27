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
   * - `accessories` (Array): List of available accessories.
   * - `amulets` (Array): List of available amulets.
   * - `backs` (Array): List of available back items.
   * - `rings` (Array): List of available rings.
   * - `slots` (Array): List of valid armor slots.
   * - `armorSets` (Array): List of available armor sets (all the armor pieces
   *                        for every stats combination).
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

    /**
     * Builds an armor set with the given 3 stats combination.
     * Alternatively, 'all' can be specified as first stat to generate the
     * special all-stats combination.
     *
     * @param {String} stat1major The major stat to use
     * @param {String} stat2minor The first minor stat to use
     * @param {String} stat3minor The second minor stat to use
     * @return {Object} An armor set, with wanted stats.
     */
    var buildArmorSet = function(name, stat1major, stat2minor, stat3minor) {
      var armorSet = {
        'name' : name,
        'helmet' : { name : name, stats : {} },
        'shoulders' : { name : name, stats : {} },
        'chest' : { name : name, stats : {} },
        'gauntlets' : { name : name, stats : {} },
        'leggings' : { name : name, stats : {} },
        'boots' : { name : name, stats : {} },
      };

      // special case: all-stats items
      if ('all' === stat1major) {
        _.each(regularStats, function(value) {
          armorSet.helmet[value] = 21;
          armorSet.shoulders[value] = 16;
          armorSet.chest[value] = 47;
          armorSet.gauntlets[value] = 16;
          armorSet.leggings[value] = 31;
          armorSet.boots[value] = 16;
        });

        return armorSet;
      }

      // generic case
      armorSet.helmet.stats[stat1major] = 47;
      armorSet.helmet.stats[stat2minor] = 34;
      armorSet.helmet.stats[stat3minor] = 34;

      armorSet.shoulders.stats[stat1major] = 35;
      armorSet.shoulders.stats[stat2minor] = 25;
      armorSet.shoulders.stats[stat3minor] = 25;

      armorSet.chest.stats[stat1major] = 106;
      armorSet.chest.stats[stat2minor] = 76;
      armorSet.chest.stats[stat3minor] = 76;

      armorSet.gauntlets.stats[stat1major] = 35;
      armorSet.gauntlets.stats[stat2minor] = 25;
      armorSet.gauntlets.stats[stat3minor] = 25;

      armorSet.leggings.stats[stat1major] = 71;
      armorSet.leggings.stats[stat2minor] = 50;
      armorSet.leggings.stats[stat3minor] = 50;

      armorSet.boots.stats[stat1major] = 35;
      armorSet.boots.stats[stat2minor] = 25;
      armorSet.boots.stats[stat3minor] = 25;

      return armorSet;
    };

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

      /**
       * The existing armor slots
       *
       * @type {Array}
       */
      slots : [
        'helmet',
        'shoulders',
        'chest',
        'gauntlets',
        'leggings',
        'boots'
      ],

      /**
       * The existing stats combinations, for each slot
       *
       * @type {Object}
       */
      armorSets : {
        'berserker': buildArmorSet('Berserker - Zojja', 'power', 'precision', 'ferocity'),
        'soldier': buildArmorSet('Soldier - Ahamid', 'power', 'toughness', 'vitality'),
        'valkyrie': buildArmorSet('Valkyrie - Gobrech', 'power', 'vitality', 'ferocity'),
        'assassin': buildArmorSet('Assassin - Saphir', 'precision', 'power', 'ferocity'),
        'rampager': buildArmorSet('Rampager - Forgemaster', 'precision', 'power', 'condDamage'),
        'cavalier': buildArmorSet('Cavalier - Angchu', 'toughness', 'power', 'ferocity'),
        'knight': buildArmorSet('Knight - Beigarth', 'toughness', 'power', 'precision'),
        'settler': buildArmorSet('Settler - Leftpaw', 'toughness', 'condDamage', 'healPower'),
        'sentinel': buildArmorSet('Sentinel - Wei Qi', 'vitality', 'power', 'toughness'),
        'shaman': buildArmorSet('Shaman - Zintl', 'vitality', 'condDamage', 'healPower'),
        'carrion': buildArmorSet('Carrion - Occam', 'condDamage', 'power', 'vitality'),
        'dire': buildArmorSet('Dire - Morbach', 'condDamage', 'toughness', 'vitality'),
        'rabid': buildArmorSet('Rabid - Ferratus', 'condDamage', 'precision', 'toughness'),
        'apothecary': buildArmorSet('Apothecary - Veldrunner', 'healPower', 'toughness', 'condDamage'),
        'cleric': buildArmorSet('Cleric - Tateos', 'healPower', 'power', 'toughness'),
        'magi': buildArmorSet('Magi - Hronk', 'healPower', 'precision', 'vitality'),
        'celestial': buildArmorSet('Celestial - Wupwup', 'all')
      },

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

      /**
       * Parses the armor sets to gather all items for the given slot
       *
       * @param  {String} slot    An armor slot
       * @return {Array}          An array of all items fitting the slot
       */
      getItemsForSlot : function(slot) {
        var self = this;
        var items = [];

        // for each set of stats...
        _.each(self.armorSets, function(set, id) {
          // ... get the item at the wanted slot
          var item = set[slot];
          item.id = id;
          items.push(item);
        });

        return items;
      }
    };
  });
