(function(angular) {
	var app = this.app = angular.module('questFyApp', ['ngRoute', 'ngStorage', 'ngTouch', 'ui.bootstrap', 'ngSwipeHandler']);

	app.run(['$location', '$rootScope', '$route', function($location, $rootScope, $route) {
	    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
		    //Change page title, based on Route information
	    	$rootScope.title = $route.current.$$route.title;
	  	});
	}]);

	app.controller('MainController',function($scope, Config, $route, $routeParams, $location, $swipe, SwipeInstance){
		$scope.$route = $route;
		$scope.$routeParams = $routeParams;
		$scope.$location = $location;
		$scope.config  = Config;

		$scope.menu = [];

		angular.forEach($route.routes, function(route, link) {
			if(route.menu) {
				$scope.menu.push({
					title: route.title,
					link: link
				});
			}
		});

		$scope.aside = {
			open: false,
			openAside: function(open) {
				$scope.aside.open = !angular.isUndefined(open)?open:!$scope.aside.open;
			}
		};

		$scope.pedrinho = new SwipeInstance();
		console.log($scope.pedrinho);

		$scope.aloha = new SwipeInstance({
			priority: 100,
			move: function() {
				console.log('MOVEU');
			}
		});

		// $swipe.bind(angular.find('.editable-container'), {
		// 			start: function(cords){
		// 				console.log(elm);
		// 				console.log('start: ', cords);
		// 			},
		// 			move: function(cords){
		// 				console.log('move: ', cords);
		// 			},
		// 			end: function(cords){
		// 				console.log('end: ', cords);
		// 			},
		// 			cancel: function(cords){
		// 				console.log('cancel: ', cords);
		// 			}
		// 		});
	});



	app.factory('Config', function(){
		var Config = function(){
			var url = 'http://localhost/klaus/quest-fy/',
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
				return url + '#' + route;
			};
		};
		return new Config();
	})
})(window.angular);