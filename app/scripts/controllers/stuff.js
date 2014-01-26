'use strict';

angular.module('gw2craftApp')
  .controller('StuffCtrl', function ($scope, $http, calculator, armory) {

    // load professions
    $http.get('data/professions.json').success(function(data) {
      $scope.professions = data;
    });

    // holds all character stats
    $scope.stats = {};

    // holds chosen armor pieces
    $scope.armor = {};

    // holds chosen weapons
    $scope.weapons = {};

    $scope.amulets = armory.amulets.query();
    $scope.rings = armory.rings.query();
    $scope.backs = armory.backs.query();
    $scope.accessories = armory.accessories.query();

    $scope.weaponTypes = armory.weaponTypes.query();
    $scope.weaponSets = armory.weaponSets;

    // monitor armor changes and update stats accordingly
    $scope.$watch('armor', function() {
      calculator.armor = $scope.armor;
      $scope.stats = calculator.update();
    }, true);

    // monitor weapon changes and update stats accordingly
    $scope.$watch('weapons', function() {
      // reset offhand if mainhand is not one-handed
      if ($scope.weapons.mainHandType && $scope.weapons.mainHandType.slot !== 'one-handed') {
        $scope.weapons.offHandType = null;
        $scope.weapons.offHandSet = null;
      }
      calculator.weapons = $scope.weapons;
      $scope.stats = calculator.update();
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
     * Sets the current profession to the given one, and refreshes stats
     * @param  {Object} profession
     */
    $scope.setProfession = function(profession) {
      calculator.profession = profession;
      $scope.stats = calculator.update();
    };

    $scope.getItemsForSlot = function(slot) {
      return armory.getItemsForSlot(slot);
    };

  });
