var myApp = angular.module('gameOnApp', []),
	config = {
		img: 'img/',
		js: 'js/',
		css: 'css/'
	},
	user = {
		photo: config.img + 'profile.png',
		name: 'profile',
		progress: 0,
		level: 1,
		addProgress: function(amount) {
			this.progress += amount;
			if(levels[this.level]<=this.progress) {
				this.progress -= levels[this.level];
				this.level++;
			}
		}
	},
	levels = {
		1: 100,
		2: 250,
		3: 500,
		4: 750,
		5: 1000
	};

myApp.controller('HeaderCtrl', function($scope) {
	$scope.profile = Object.create(user);

	$scope.profile.level = 3;
	$scope.profile.name = 'Klaus Kazlauskas';
	$scope.profile.progress = 120;
	$scope.profile.addProgress = function(amount) {
		Object.getPrototypeOf(this).addProgress.call(this, amount);
		$scope.progress.update();
	}

	$scope.progress = {
		value: $scope.profile.progress,
		max: levels[$scope.profile.level],
		position: function() {
			return $scope.progress.value*100/$scope.progress.max;
		},
		update: function() {
			$scope.progress.value = $scope.profile.progress;
			$scope.progress.max = levels[$scope.profile.level];
		}
	};

	$scope.profile.addProgress(100);
});
// SNIPPET
// var intervalo = setInterval(function(){
// console.log(progress.value<progress.max, progress.value, progress.max);
//   if(progress.value<200 && progress.value<progress.max) {
//     progress.value++;
//   } else {
//     clearInterval(intervalo);
//   }
// }, (1000/progress.max)*5);