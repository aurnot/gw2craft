'use strict';

angular.module('gw2craftApp')
  .factory('armory', function($resource, _) {

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

      // stats that use regular values
      var armorStats = ['power', 'precision', 'toughness', 'vitality', 'condDamage', 'healPower'];

      // stats that use percentage values
      var armorStatsPercent = ['critDamage'];

      // special case: all-stats items
      if ('all' === stat1major) {
        _.each(armorStats, function(value) {
          armorSet.helmet[value] = 21;
          armorSet.shoulders[value] = 16;
          armorSet.chest[value] = 47;
          armorSet.gauntlets[value] = 16;
          armorSet.leggings[value] = 31;
          armorSet.boots[value] = 16;
        });

        _.each(armorStatsPercent, function(value) {
          armorSet.helmet[value] = 3;
          armorSet.shoulders[value] = 2;
          armorSet.chest[value] = 6;
          armorSet.gauntlets[value] = 2;
          armorSet.leggings[value] = 4;
          armorSet.boots[value] = 2;
        });

        return armorSet;
      }

      // generic case
      var isStat2percent = _.contains(armorStatsPercent, stat2minor);
      var isStat3percent = _.contains(armorStatsPercent, stat3minor);

      armorSet.helmet.stats[stat1major] = 47;
      armorSet.helmet.stats[stat2minor] = isStat2percent ? 2 : 34;
      armorSet.helmet.stats[stat3minor] = isStat3percent ? 2 : 34;

      armorSet.shoulders.stats[stat1major] = 35;
      armorSet.shoulders.stats[stat2minor] = isStat2percent ? 2 : 25;
      armorSet.shoulders.stats[stat3minor] = isStat3percent ? 2 : 25;

      armorSet.chest.stats[stat1major] = 106;
      armorSet.chest.stats[stat2minor] = isStat2percent ? 5 : 76;
      armorSet.chest.stats[stat3minor] = isStat3percent ? 5 : 76;

      armorSet.gauntlets.stats[stat1major] = 35;
      armorSet.gauntlets.stats[stat2minor] = isStat2percent ? 2 : 25;
      armorSet.gauntlets.stats[stat3minor] = isStat3percent ? 2 : 25;

      armorSet.leggings.stats[stat1major] = 71;
      armorSet.leggings.stats[stat2minor] = isStat2percent ? 3 : 50;
      armorSet.leggings.stats[stat3minor] = isStat3percent ? 3 : 50;

      armorSet.boots.stats[stat1major] = 35;
      armorSet.boots.stats[stat2minor] = isStat2percent ? 2 : 25;
      armorSet.boots.stats[stat3minor] = isStat3percent ? 2 : 25;

      return armorSet;
    };

    return {

      amulets : $resource('data/amulets.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }),

      rings : $resource('data/rings.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }),

      backs : $resource('data/backs.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }),

      accessories : $resource('data/accessories.json', {}, {
        query : { method : 'GET', params : {}, isArray : true }
      }),

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
        'berserker': buildArmorSet('Berserker - Zojja', 'power', 'precision', 'critDamage'),
        'soldier': buildArmorSet('Soldier - Ahamid', 'power', 'toughness', 'vitality'),
        'valkyrie': buildArmorSet('Valkyrie - Gobrech', 'power', 'vitality', 'critDamage'),
        'assassin': buildArmorSet('Assassin - Saphir', 'precision', 'power', 'critDamage'),
        'rampager': buildArmorSet('Rampager - Forgemaster', 'precision', 'power', 'condDamage'),
        'cavalier': buildArmorSet('Cavalier - Angchu', 'toughness', 'power', 'critDamage'),
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
