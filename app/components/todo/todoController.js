(function(angular) {
	app.controller('TodoController', function($scope, Config, Task, $localStorage, $modal, $route, $routeParams, $filter){
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

		$scope.open = function(task) {
			var modal = $modal.open({
				templateUrl: Config.baseUrl('app/components/shared/modal/taskModalView.html'),
				controller: 'TaskModalController',
				resolve: {
					task: function() {
						return task;
					}
				}
			});
		};

		$scope.lists = $scope.$storage.lists;
		$scope.rewards = $scope.$storage.rewards;

		$scope.toogleChecked = function(list, task) {
			var clickedTask = listIndex = $scope.lists.indexOf(list),
				taskIndex = $scope.lists[listIndex].tasks.indexOf(task);
			$scope.lists[listIndex].tasks[taskIndex].done = !$scope.lists[listIndex].tasks[taskIndex].done;
		}

		$scope.addList = function(list) {
			$scope.lists.push({
				title: list.title,
				tasks: [],
				newTask: {}
			});
			$scope.$storage.lists = $scope.$storage.lists ? $scope.$storage.lists : $scope.lists;
		};

		$scope.deleteAllLists = function() {
			delete $scope.$storage.lists;
			$scope.lists = [];
		}

		$scope.addTask = function(list, task) {
			if(task.name){
				var index = $scope.lists.indexOf(list);
				task.done = task.done || false;
				$scope.lists[index].tasks.push({
					name: task.name,
					done: task.done,
					options: false,
					status: 0
				});
			}
		};
	});

	app.controller('TaskModalController', function($scope, $modalInstance, task){
		console.log(task);
		$scope.task = task;
	});
})(window.angular);