(function(angular){
	app.directive('taskList', function($scope) {
		return {
			restrict: 'E',
			templateUrl: 'app/components/todo/taskListView.html'
		};
	});

	app.directive('task', function($scope) {
		return {
			restrict: 'E',
			templateUrl: 'app/components/todo/taskView.html'
		};
	});

	app.directive('taskPreview', function($scope) {
		return {
			restrict: 'E',
			templateUrl: 'app/components/todo/taskPreviewView.html'
		};
	});

	/**
	 * Factory to handle all task actions
	 *
	 * Most of function will handle the properties of the Task Object.
	 * 
	 * Task Object:
	 * | Field 		| Type 		| Description 								|
	 * |------------|-----------|-------------------------------------------|
	 * | name 		| String 	| Task's name 								|
	 * | done 		| Boolean 	| True if task is done. Default is false 	|
	 * | options 	| Boolean 	| Menu open on true. Default is false 		|
	 * | status 	| Integer 	| Status points for doing the task 			|
	 * 
	 * 
	 * @return {[type]}                          [description]
	 */
	app.factory('Task', function($localStorage){
		return {
			/**
			 * Open all task's information
			 * 
			 * @param  {Task}		task 	Task's properties
			 * @return {Boolean} 			Return true on success
			 */
			showTask: function(task) {
				alert(task.name);
				return true;
			},

			/**
			 * Clone the current task and push it on the list
			 * 
			 * @param  {List} 		list 	List Object
			 * @param  {Task}		task 	Task Object
			 * @return {Boolean}     		Return true on success
			 */
			cloneTask: function(list, task) {
				var clonedTask = angular.copy(task);
				// Set cloned task to it's default values
				clonedTask.options = false;
				clonedTask.status = 0;
				clonedTask.done = false;

				list.tasks.push(clonedTask);
				return true;
			},

			/**
			 * Toogle the option's panel on and off
			 * 
			 * @param  {List} 		list 	List Object
			 * @param  {Task}  		task 	Task Object
			 * @return {Boolean}			Return true on success
			 */
			toogleOption: function(list, task) {
				angular.forEach(list.tasks, function(tasks, index){
					if(index != list.tasks.indexOf(task)) {
						tasks.options = false;
					}
				});
				if(!angular.isUndefined(task)) {
					task.options = !task.options;
					return true;
				}
			},

			/**
			 * Delete the task
			 * 
			 * @param  {List} 		list 	List Object
			 * @param  {Task}		task 	Task Object
			 * @return {Boolean}    		Return true on success
			 */
			deleteTask: function(list, task) {
				var indexes = this.getIndexes(list, task);

				$localStorage.lists[indexes.list].tasks.splice([indexes.task],1);
				return true;
			},

			/**
			 * Get list and task indexes
			 *
			 * Returned Object:
			 * | Field  | Type 		| Description 			|
			 * |--------|-----------|-----------------------|
			 * | list 	| Integer	| Index of current list |
			 * | task 	| Integer 	| Index of current task |
			 * 
			 * @param  {List}	list 	List Object
			 * @param  {Task}	task 	Task Object
			 * @return {Object}			Return list and task indexes
			 */
			getIndexes: function(list, task) {
				return {
					list: $localStorage.lists.indexOf(list),
					task: list.tasks.indexOf(task)
				};
			},

			/**
			 * Update all tasks properties
			 * 
			 * @param  {List} 		list 	List Object
			 * @param  {Task} 		task 	Task Object
			 * @return {Boolean} 			Return true on success
			 */
			updateTask: function(list, task) {
				var indexes = this.getIndexes(list, task);

				list.tasks[indexes.task] = task;
				return true;
			},

			/**
			 * Get task status and translate to a CSS class
			 *
			 * The CSS class has this structure:
			 *   1. Starts with 'status-'
			 *   2. Verify if status is negative or positive
			 *     1. Negative - Join 'negative-' to the String
			 *     2. Positive - Join 'positive-' to the String
			 *   3. Join the status number without passing the limit of 5 or -5
			 *
			 * Example of return:
			 *     statusLimit = 5;
			 *     status = -20;
			 *
			 *     statusClass = 'status-negative-5';
			 * 
			 * @param  {Task} 	task 	Task Object
			 * @return {String} 		CSS class
			 */
			getStatus: function(task) {
				var statusLimit = 5,
					status = task.status;

				if(status) {
					var statusClass = 'status-',
						statusAbs = Math.abs(status);

					statusClass += status>0 ? 'positive-' : 'negative-';
					statusClass += statusAbs>statusLimit ? statusLimit : statusAbs;
					return statusClass;
				}
				return false;
			},

			/**
			 * Set status points
			 * 
			 * @param  {List} 		list 	List Object
			 * @param  {Task} 		task  	Task Object
			 * @param  {Integer} 	status 	Positive or negative values
			 * @return {Boolean} 	      	Return true on success
			 */
			setStatus: function(list, task, status) {
				task.status += status;

				this.updateTask(list, task);
				return true;
			},

			/**
			 * Verify if the task is done or not
			 * 
			 * @param  {Task}  		task 	Task Object
			 * @return {Boolean}    		Return done status
			 */
			isDone: function(task) {
				return task.done;
			},

			/**
			 * Set done status
			 * 
			 * @param  {List} 		list 	List Object
			 * @param  {Task}    	task 	Task Object
			 * @param  {Boolean} 	done 	Done status
			 * @return {Boolean} 			Return true on success
			 */
			setDone: function(list, task, done) {
				task.done = done;

				task.updateTask(list, task);
				return true;
			}
		};
	});

	app.factory("TaskClass", function($localStorage){
		return function(list, newTask) {
			// The status must stay between -5 to 5
			var statusLimit = 5,
				list = list,

			// Default task settings
			task = {
				name: "task name",
				done: false,
				options: false,
				status: 0,
				type: "task"
			};

			// Extends values from newTask to task
			angular.extend(task, newTask);

			// Get the task's name
			this.getName = function() {
				return task.name;
			};

			// Change the task's name
			this.setName = function(name) {
				if(typeof name != "undefined") {
					if(name.length<25) {
						task.name = name;
						this.updateTask();
						return true;
					} else {
						return "The task's name should be lower than 25 characters."
					}
				} else {
					return "The task's name is undefined.";
				}
			};

			// Return task's done status
			this.isDone = function() {
				return task.done;
			};

			// Set task's done status
			this.setDone = function(done) {
				if(typeof done != "undefined") {
					task.done = done;
					this.updateTask();
					return true;
				} else {
					return "The task's done status is undefined.";
				}
			};

			// Change done to the oposite
			this.toogleDone = function() {
				this.setDone(!task.done);
			};

			// Get the CSS class which represents the current task's status
			this.getStatus = function() {
				if(task.status) {
					var statusClass = 'status-',
						statusAbs = Math.abs(task.status);

					statusClass += task.status>0 ? 'positive-' : 'negative-';
					statusClass += statusAbs>statusLimit ? statusLimit : statusAbs;
					return statusClass;
				}
				return false;
			};

			// Get the index of the task's list and the task
			this.getIndexes = function() {
				return {
					list: $localStorage.lists.indexOf(list),
					task: list.tasks.indexOf(this)
				};
			};

			// Update the task
			this.updateTask = function() {
				var indexes = this.getIndexes();
				$localStorage.lists[indexes.list].tasks[indexes.task] = task;
			}
		}
	});

	app.filter('taskStatus', function(){
		var statusLimit = 5;
		return function(status) {
			if(status) {
				var statusClass = 'status-',
					statusAbs = Math.abs(status);

				statusClass += status>0 ? 'positive-' : 'negative-';
				statusClass += statusAbs>statusLimit ? statusLimit : statusAbs;
				return statusClass;
			}
			return false;
		}
	});
})(window.angular);