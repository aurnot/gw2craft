'use strict';

angular.module('gw2craftApp')
  .controller('StuffCtrl', function ($scope, $http, _, calculator, armory) {

    // load professions
    $http.get('data/professions.json').success(function(data) {
      $scope.professions = data;
    });

    // holds current profession
    $scope.profession = calculator.profession;

    // holds all character stats
    $scope.stats = calculator.stats;

    // holds chosen armor pieces
    $scope.armor = calculator.armor;

    // holds chosen weapons
    $scope.weapons = calculator.weapons;

    $scope.amulets = armory.amulets.query();
    $scope.rings = armory.rings.query();
    $scope.backs = armory.backs.query();
    $scope.accessories = armory.accessories.query();

    $scope.weaponTypes = armory.weaponTypes.query();
    $scope.weaponSets = armory.weaponSets;

    // monitor armor changes and update stats accordingly
    $scope.$watch('armor', function() {
      calculator.update();
    }, true);

    // monitor weapon changes and update stats accordingly
    $scope.$watch('weapons', function() {
      // reset offhand if mainhand is not one-handed
      if ($scope.weapons.mainHandType && $scope.weapons.mainHandType.slot !== 'one-handed') {
        $scope.weapons.offHandType = null;
        $scope.weapons.offHandSet = null;
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
            return _.contains($scope.profession.mainHand, item.id);
          } else if ('off-hand' === hand) {
            return _.contains($scope.profession.offHand, item.id);
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
      calculator.update();
    };

    $scope.getItemsForSlot = function(slot) {
      return armory.getItemsForSlot(slot);
    };

  });
