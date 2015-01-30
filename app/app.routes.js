(function(angular) {
	var components = 'app/components/';

	gameOnApp.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.otherwise({redirectTo: '/'})
			.when('/', {
				templateUrl: components + 'todo/todoView.html',
				controller: 'TodoController',
				title: 'Home',
				menu: true,
				image: 'fa-home'
			})
			.when('/teste/:isso?', {
				templateUrl: components + 'teste/testeView.html',
				controller: 'TesteController',
				title: 'Teste'
			})
			.when('/outro-teste', {
				templateUrl: components + 'teste/testeView.html',
				controller: 'TodoController',
				title: 'Testado',
				menu: true,
				image: 'fa-cube'
			});

		$locationProvider.html5Mode(true);
	});
})(window.angular);