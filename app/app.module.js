(function(angular) {
	var app = this.app = angular.module('questFyApp', ['ngRoute', 'ngMaterial']);

	app.run(['$location', '$rootScope', '$route', function($location, $rootScope, $route) {
	    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
		    //Change page title, based on Route information
	    	$rootScope.title = $route.current.$$route.title;
	  	});
	}]);

	app.controller('MainController',function($scope){

		var item = {
		    face: '#',
		    what: 'Brunch this weekend?',
		    who: 'Min Li Chan',
		    notes: "I'll be in your neighborhood doing errands."
		  };
		  $scope.todos = [];
		  for (var i = 0; i < 15; i++) {
		    $scope.todos.push({
		      face: '#',
		      what: "Brunch this weekend?",
		      who: "Min Li Chan",
		      notes: "I'll be in your neighborhood doing errands."
		    });
		  }

	});
})(window.angular);