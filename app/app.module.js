(function(angular) {
	var app = this.app = angular.module('questFyApp', ['ngRoute', 'ngMaterial']);

	app.run(['$location', '$rootScope', '$route', function($location, $rootScope, $route) {
	    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
		    //Change page title, based on Route information
	    	$rootScope.title = $route.current.$$route.title;
	  	});
	}]);

	app.controller('MainController',function($scope, $timeout, $http, $mdSidenav){

	  	$scope.todos = [];

	  	$http.get("http://pokeapi.co/api/v1/pokedex/1/")
	  		.then(function(response) {

	  			angular.forEach(response.data.pokemon.slice(0, 10), function(pokemon, key) {

	  				$http.get("http://pokeapi.co/" + pokemon.resource_uri)
	  					.then(function(pokemonResponse) {

	  						$http.get("http://pokeapi.co/" + pokemonResponse.data.sprites[0].resource_uri)
	  							.then(function(spriteResponse){
	  								$scope.todos.push(spriteResponse.data);
	  							});
	  					});
	  			});
	  		});

	  	$scope.toggleLeft = function() {
	  		$mdSidenav('left').toggle().then(function() {
	  			console.log('Foi');
	  		});
	  	}

	});
})(window.angular);