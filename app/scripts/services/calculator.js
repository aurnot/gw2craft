'use strict';

angular.module('gw2craftApp')
  .factory('calculator', function(_) {
    return {
      stats : {},

      baseStats : {
        // primary
        power : 916,
        precision : 916,
        toughness : 916,
        vitality : 916,

        // secondary
        condDamage : 0,
        critDamage : 0,
        healPower : 0,

        // derived
        attack : 0,
        critChance : 0,
        armor : 0,
        health : 0,

        // other
        defense : 0
      },

      profession : null,

      armor : {},

      /**
       * Updates the stats for current profession and armor, then returns them
       *
       * @return {Object}
       */
      update : function() {
        this._applyBaseStats();
        this._applyProfessionStats();
        this._applyArmorStats();
        this._calculateStats();

        return this.stats;
      },

      /**
       * Resets stats to their base value
       *
       * @protected
       */
      _applyBaseStats : function() {
        var self = this;
        _.each(self.baseStats, function(value, key) {
          self.stats[key] = value;
        });
      },

      /**
       * Applies any profession-related stat modification
       *
       * @protected
       */
      _applyProfessionStats : function() {
        if (this.profession) {
          this.stats.defense += this.profession.defense;
          this.stats.health += this.profession.health;
        }
      },

      /**
       * Applies the stats from armor pieces
       *
       * @protected
       */
      _applyArmorStats : function() {
        var self = this;
        _.each(self.armor, function(armorPiece) {
          _.each(armorPiece.stats, function(value, stat) {
            self.stats[stat] += value;
          });
        });
      },

      /**
       * Calculates derived stats
       *
       * @protected
       */
      _calculateStats : function() {
        // attack
        var power = this.stats.power;
        var attack = power;
        this.stats.attack = attack;

        // crit chance
        var precision = this.stats.precision;
        var critChance = Math.floor((precision - 822) / 21);
        this.stats.critChance = critChance;

        // armor
        var toughness = this.stats.toughness;
        var defense = this.stats.defense;
        var armor = toughness + defense;
        this.stats.armor = armor;

        // health
        var vitality = this.stats.vitality;
        var health = 10 * vitality;
        this.stats.health += health; // add vita health to base pool
      }
    };
  });
