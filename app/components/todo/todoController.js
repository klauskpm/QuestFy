(function(angular) {
	app.controller('TodoController', function($scope, $localStorage, $route, $routeParams, $filter){
		$scope.name = 'TodoController';
		$scope.config = Config;
		$scope.taskFct = Task;

		$scope.newList = '';

		$scope.$watch('newList.title', function() {
			$scope.newList.title = $filter('capitalize')($scope.newList.title);
		});

		$scope.$storage = $localStorage.$default({
			lists: [],
			rewards: [],
			order: []
		});

		$scope.lists = $scope.$storage.lists;
		$scope.rewards = $scope.$storage.rewards;
	});
})(window.angular);