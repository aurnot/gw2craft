'use strict';

angular.module('gw2craftApp')
  .controller('StuffCtrl', function ($scope, $http, _, calculator, game, armory) {

    // holds current profession
    $scope.profession = calculator.profession;

    // holds all character stats
    $scope.stats = calculator.stats;

    // holds chosen armor pieces
    $scope.armor = calculator.armor;

    // holds chosen weapons
    $scope.weapons = calculator.weapons;

    // load professions
    $scope.professions = game.professions;

    // load armor pieces
    $scope.amulets = armory.amulets;
    $scope.rings = armory.rings;
    $scope.backs = armory.backs;
    $scope.accessories = armory.accessories;

    $scope.weaponTypes = armory.weaponTypes;
    $scope.weaponSets = armory.weaponSets;

    // monitor armor changes and update stats accordingly
    $scope.$watch('armor', function() {
      calculator.update();
    }, true);

    // monitor weapon changes and update stats accordingly
    $scope.$watch('weapons', function(newWeapons, oldWeapons) {
      // reset offhand if mainhand is not one-handed
      if ($scope.weapons.mainHandType && $scope.weapons.mainHandType.slot !== 'one-handed') {
        $scope.weapons.offHandType = null;
        $scope.weapons.offHandSet = null;
      }

      // reset mainhand stats if no type selected
      if (!$scope.weapons.mainHandType) {
        $scope.weapons.mainHandSet = null;
      }

      // reset offhand stats if no type selected
      if (!$scope.weapons.offHandType) {
        $scope.weapons.offHandSet = null;
      }

      if (newWeapons.mainHandType && oldWeapons.mainHandType) {
        // reset mainhand stats when changing slot (one-handed/two-handed)
        if (newWeapons.mainHandType.slot != oldWeapons.mainHandType.slot) {
          $scope.weapons.mainHandSet = null;
        }
      }

      calculator.update();
    }, true);

    /**
     * Filters list of weapons for the mainhand slot (one-handed or two-handed)
     * @param  {Object} item a weapon in the list
     * @return {Boolean} Whether the item is available
     */
    $scope.availableInMainHand = function(item) {
      if (!$scope.weapons.mainHandType) {
        return false;
      }

      // check if item is allowed for the current slot
      return $scope.weapons.mainHandType.slot === item.slot;
    };

    /**
     * Filters list of weapon types for the given hand, based on the current
     * profession
     *
     * @param  {String} hand 'main-hand' | 'off-hand'
     * @return {Boolean} Whether the item type is available for the profession
     * and hand
     */
    $scope.availableForProfession = function(hand) {
      return function(item) {
        if ($scope.profession) {
          // check if item type is allowed for the current profession
          if ('main-hand' === hand) {
            return game.professionCanWieldWeapon($scope.profession, item, 'main-hand');
          } else if ('off-hand' === hand) {
            return game.professionCanWieldWeapon($scope.profession, item, 'off-hand');
          }
        }

        return false;
      }
    };

    /**
     * Sets the current profession to the given one, and refreshes stats
     * @param  {Object} profession
     */
    $scope.setProfession = function(profession) {
      $scope.profession = profession;
      calculator.profession = profession;

      if ($scope.weapons.mainHandType) {
        if (!game.professionCanWieldWeapon(profession, $scope.weapons.mainHandType, 'main-hand')) {
          $scope.weapons.mainHandType = null;
        }
      }
      if ($scope.weapons.offHandType) {
        if (!game.professionCanWieldWeapon(profession, $scope.weapons.offHandType, 'off-hand')) {
          $scope.weapons.offHandType = null;
        }
      }

      calculator.update();
    };

    $scope.getItemsForSlot = function(slot) {
      return armory.getItemsForSlot(slot);
    };

  });
