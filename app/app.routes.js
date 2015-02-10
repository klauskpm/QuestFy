(function(angular) {
	var components = 'app/components/';

	app.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
		$routeProvider
			.otherwise({redirectTo: '/'})
			.when('/', {
				templateUrl: components + 'todo/todoView.html',
				controller: 'TodoController',
				title: 'My Tasks',
				menu: true
			})
			.when('/outro-teste', {
				templateUrl: components + 'teste/testeView.html',
				controller: 'TodoController',
				title: 'Oh shit this is awesome',
				menu: true
			});

		$locationProvider.html5Mode(false);

		$mdThemingProvider.theme('default')
			.primaryPalette('red')
			.accentPalette('orange')
			.warnPalette('deep-purple');
	});
})(window.angular);