(function(angular) {
	var app = this.app = angular.module('questFyApp', ['ngRoute', 'ngStorage', 'ngTouch', 'ui.bootstrap', 'ngSwipeHandler']);

	app.run(['$location', '$rootScope', '$route', function($location, $rootScope, $route) {
	    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
		    //Change page title, based on Route information
	    	$rootScope.title = $route.current.$$route.title;
	  	});
	}]);

	app.controller('MainController',function($scope){

	});
})(window.angular);