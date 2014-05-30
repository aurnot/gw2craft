'use strict';

angular.module('gw2craftApp')

  .controller('WeaponCtrl', function ($scope, armory, calculator, game) {
    var ctrl = this;

    ctrl.init = function () {
      // bind directly to the calculator
      $scope.weapons = calculator.weapons;

      $scope.weaponTypes = armory.weaponTypes;
      $scope.weaponSets = armory.weaponSets;

      // monitor weapon changes and update stats accordingly
      $scope.$watch('weapons', function weaponsWatcher (newWeapons, oldWeapons) {
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
          if (newWeapons.mainHandType.slot !== oldWeapons.mainHandType.slot) {
            $scope.weapons.mainHandSet = null;
          }
        }

        calculator.update();
      }, true);
    };

    /**
     * Filters list of weapons for the mainhand slot (one-handed or two-handed)
     *
     * @param {Object} item a weapon in the list
     * @returns {Boolean} Whether the item is available
     */
    $scope.availableInMainHand = function (item) {
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
     * @param {String} hand 'main-hand' | 'off-hand'
     * @returns {Boolean} Whether the item type is available for the profession
     * and hand
     */
    $scope.availableForProfession = function (hand) {
      return function(item) {
        if ($scope.shared.profession) {
          // check if item type is allowed for the current profession
          if ('main-hand' === hand) {
            return game.professionCanWieldWeapon($scope.shared.profession, item, 'main-hand');
          } else if ('off-hand' === hand) {
            return game.professionCanWieldWeapon($scope.shared.profession, item, 'off-hand');
          }
        }

        return false;
      }
    };

    this.init();
  });
