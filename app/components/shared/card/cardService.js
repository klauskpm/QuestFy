(function(angular) {
	app.directive('card', function($scope) {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			templateUrl: 'app/components/shared/card/cardView.html',
			link: function($scope, iElm, iAttrs, controller) {
				if(iAttrs.type) {
					$scope.cardClass = 'card-' + iAttrs.type;
				}
			}
		}
	});
})(window.angular);