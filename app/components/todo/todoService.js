(function(angular){
	gameOnApp.directive('taskList', function($scope) {
		return {
			restrict: 'E',
			templateUrl: 'app/components/todo/taskListView.html'
		};
	});

	gameOnApp.directive('task', function($scope) {
		return {
			restrict: 'E',
			templateUrl: 'app/components/todo/taskView.html'
		};
	});

	gameOnApp.directive('taskPreview', function($scope) {
		return {
			restrict: 'E',
			templateUrl: 'app/components/todo/taskPreviewView.html'
		};
	});

	gameOnApp.factory('Task', function($localStorage){
		return {
			showTask: function(task) {
				alert(task.name);
			},
			cloneTask: function(list, task) {
				var clonedTask = angular.copy(task);
				// Setting it to default values
				clonedTask.options = false;
				list.tasks.push(clonedTask);
			},
			toogleOption: function(list, task) {
				angular.forEach(list.tasks, function(tasks, index){
					if(index != list.tasks.indexOf(task)) {
						tasks.options = false;
					}
				});
				if(!angular.isUndefined(task)) {
					task.options = !task.options;
				}
			},
			deleteTask: function(list, task) {
				var listIndex = $localStorage.lists.indexOf(list),
					taskIndex = list.tasks.indexOf(task);

				$localStorage.lists[listIndex].tasks.splice([taskIndex],1);
			},
			updateStatus: function(list, task, value) {
				var listIndex = $localStorage.lists.indexOf(list),
					taskIndex = list.tasks.indexOf(task),
					status = $localStorage.lists[listIndex].tasks[taskIndex].status;

				if((status+value)<=5 && (status+value)>=-5) {
					$localStorage.lists[listIndex].tasks[taskIndex].status += value;
				}
			}
		};
	});

	gameOnApp.filter('taskStatus', function(){
		return function(status) {
			if(status<0 && status>=-5) {
				return 'status-negative-' + Math.abs(status);
			} else if(status>0 && status<=5) {
				return 'status-positive-' + status;
			} else {
				return '';
			}
		}
	});
})(window.angular);