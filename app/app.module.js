(function(angular) {
	var gameOnApp = this.gameOnApp = angular.module('gameOnApp', ['ngRoute', 'ngStorage', 'ui.bootstrap']);

	gameOnApp.run(['$location', '$rootScope', '$route', function($location, $rootScope, $route) {
	    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
		    //Change page title, based on Route information
		    console.log($route.current.$$route.title);
	    	$rootScope.title = $route.current.$$route.title;
	  	});
	}]);

	gameOnApp.controller('MainController',function($scope, Config, $route, $routeParams, $location){
		$scope.$route = $route;
		$scope.$routeParams = $routeParams;
		$scope.$location = $location;
		$scope.config  = Config;

		$scope.menu = [];

		angular.forEach($route.routes, function(route, link) {
			if(route.menu) {
				$scope.menu.push({
					title: route.title,
					link: link,
					image: route.image
				});
			}
		});

		$scope.aside = {
			open: false,
			openAside: function(open) {
				$scope.aside.open = !angular.isUndefined(open)?open:!$scope.aside.open;
			}
		};
	});



	gameOnApp.factory('Config', function(){
		var Config = function(){
			var url = 'http://localhost/klaus/game-on/',
				root = 'app/',
				img = 'assets/img/',
				js = 'assets/js/',
				css = 'assets/css/',
				components = 'components/';

			this.img = url+img;
			this.js = url+js;
			this.css = url+css;
			this.components = root+components;

			this.baseUrl = function(route) {
				return url + route;
			};
		};
		return new Config();
	})
})(window.angular);