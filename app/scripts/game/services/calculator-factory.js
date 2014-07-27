'use strict';

angular.module('gw2craftApp')

  .factory('calculator', function (_) {

    /**
     * Resets stats to their base value
     */
    var applyBaseStats = function (calculator) {
      _.each(calculator.baseStats, function(value, key) {
        calculator.stats[key] = value;
      });
    };

    /**
     * Applies any profession-related stat modification
     */
    var applyProfessionStats = function (calculator) {
      if (calculator.profession) {
        calculator.stats.defense += calculator.profession.defense;
        calculator.stats.health += calculator.profession.health;
      }
    };

    /**
     * Applies the stats from armor pieces
     */
    var applyArmorStats = function (calculator) {
      // iterate through each armor piece
      _.each(calculator.armor, function(armorPiece) {
        // skip piece if not present (item has been unset)
        if (!armorPiece) {
          return;
        }

        _.each(armorPiece.stats, function(value, stat) {
          calculator.stats[stat] += value;
        });
      });
    };

    /**
     * Applies the stats from weapons
     */
    var applyWeaponsStats = function (calculator) {
      // main hand
      if (calculator.weapons.mainHandSet) {
        _.each(calculator.weapons.mainHandSet.stats, function(value, stat) {
          calculator.stats[stat] += value;
        });
      }

      // off hand
      if (calculator.weapons.offHandSet) {
        _.each(calculator.weapons.offHandSet.stats, function(value, stat) {
          calculator.stats[stat] += value;
        });
      }
    };

    /**
     * Calculates derived stats
     */
    var calculateStats = function (calculator) {
      // attack
      var power = calculator.stats.power;
      var attack = power;
      calculator.stats.attack = attack;

      // crit chance
      var precision = calculator.stats.precision;
      var critChance = Math.floor((precision - 822) / 21);
      calculator.stats.critChance = critChance;

      // crit damage
      var ferocity = calculator.stats.ferocity;
      var critDamage = Math.floor(ferocity / 15) + 150;
      calculator.stats.critDamage = critDamage;

      // armor
      var toughness = calculator.stats.toughness;
      var defense = calculator.stats.defense;
      var armor = toughness + defense;
      calculator.stats.armor = armor;

      // health
      var vitality = calculator.stats.vitality;
      var health = 10 * vitality;
      calculator.stats.health += health; // add vita health to base pool
    };


    // -------------------------------------------------------------------------
    //    public API
    // -------------------------------------------------------------------------

    /**
     * The calculator service
     *
     * @type {Object}
     */
    var calculator = {};

    /**
     * Holds calculated stats in a map { stat : value }
     *
     * @readonly
     * @see  calculator.baseStats
     * @type {Object}
     */
    calculator.stats = {};

    // default values
    /**
     * Default values for each stat
     *
     * @property {Integer} calculator.baseStats.power       Power (primary stat)
     * @property {Integer} calculator.baseStats.precision   Precision (primary stat)
     * @property {Integer} calculator.baseStats.toughness   Toughness (primary stat)
     * @property {Integer} calculator.baseStats.vitality    Vitality (primary stat)
     * @property {Integer} calculator.baseStats.condDamage  Condition damage (secondary stat)
     * @property {Integer} calculator.baseStats.condDuration Condition duration (secondary stat)
     * @property {Integer} calculator.baseStats.ferocity    Ferocity (secondary stat)
     * @property {Integer} calculator.baseStats.healPower   Healing power (secondary stat)
     * @property {Integer} calculator.baseStats.boonDuration Boon duration (secondary stat)
     * @property {Integer} calculator.baseStats.attack      Attack (derived stat)
     * @property {Integer} calculator.baseStats.critChance  Critical chance (derived stat)
     * @property {Integer} calculator.baseStats.critDamage  Critical damage (derived stat)
     * @property {Integer} calculator.baseStats.armor       Armor (derived stat)
     * @property {Integer} calculator.baseStats.health      Health (derived stat)
     * @property {Integer} calculator.baseStats.defense     Defense
     *
     * @readonly
     * @type {Object}
     */
    calculator.baseStats = {
      // primary
      power : 916,
      precision : 916,
      toughness : 916,
      vitality : 916,

      // secondary
      condDamage : 0,
      condDuration : 0,
      ferocity: 0,
      healPower : 0,
      boonDuration : 0,

      // derived
      attack : 0,
      critChance : 0,
      critDamage : 0,
      armor : 0,
      health : 0,

      // other
      defense : 0
    };

    /**
     * @property {Object} calculator.profession The selected profession
     * @readonly
     * @see calculator.setProfession
     */
    calculator.profession = null;

    /**
     * Sets the current profession to the given one. If it changes, weapons are
     * reset.
     *
     * @param {Object} profession
     */
    calculator.setProfession = function (profession) {
      // check if profession has changed
      if (!(profession && this.profession && profession.id === this.profession.id)) {
        // reset weapons
        calculator.weapons.mainHandType = null;
        calculator.weapons.offHandType = null;
        calculator.weapons.mainHandSet = null;
        calculator.weapons.offHandSet = null;
      }

      calculator.profession = profession;
    };

    /**
     * Map of selected armor pieces. Assign pieces by their id.
     *
     * @example
     * calculator.armor.chest = someChestPiece;
     * calculator.armor.helmet = aCoolHelmet;
     *
     * @property {Object} calculator.armor.helmet     set of helmet
     * @property {Object} calculator.armor.shoulders  set of shoulders
     * @property {Object} calculator.armor.chest      set of chest
     * @property {Object} calculator.armor.gauntlets  set of gauntlets
     * @property {Object} calculator.armor.leggings   set of leggings
     * @property {Object} calculator.armor.boots      set of boots
     *
     * @type {Object}
     */
    calculator.armor = {
      helmet : null,
      shoulders : null,
      chest : null,
      gauntlets : null,
      leggings : null,
      boots : null
    };

    /**
     * Map of selected weapons types and sets, for both hands. Assign a type of
     * weapon (e.g. axe, hammer, ...) and a set (stats combination) for each
     * hand.
     *
     * @example
     * calculator.weapons.mainHandType = aDeadlyDagger;
     * calculator.weapons.mainHandSet = someOpStats;
     *
     * @property {Object} calculator.weapons.mainHandType type of weapon for the main hand
     * @property {Object} calculator.weapons.offHandType  type of weapon for the off hand
     * @property {Object} calculator.weapons.mainHandSet  set of weapon for the main hand
     * @property {Object} calculator.weapons.offHandSet   set of weapon for the off hand
     *
     * @type {Object}
     */
    calculator.weapons = {};

      /**
       * Updates the stats based on selected professsion and items, then returns
       * them
       *
       * @return {Object}
       */
    calculator.update = function () {
      applyBaseStats(this);
      applyProfessionStats(this);
      applyArmorStats(this);
      applyWeaponsStats(this);
      calculateStats(this);

      return this.stats;
    };

    return calculator;
  });
