(function(angular) {
	gameOnApp.controller('TesteController', function($scope, Config, $route, $routeParams){
		$scope.name = 'TesteController';
		$scope.config = Config;
		$scope.$route = $route;
	});
})(window.angular);