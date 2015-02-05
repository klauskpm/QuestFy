(function(){
	'use strict';
	var ngSwipeHandler = angular.module('ngSwipeHandler', ['ngTouch']);

	ngSwipeHandler.directive('ngSwipeObject', function($swipe, SwipeFactory){
		// Runs during compile
		return {
			restrict: 'A',
			link: function(scope, elm, attrs, controller) {
				$swipe.bind(elm, {
					start: function(cords) {
						var swipeObject = scope.$eval(attrs.ngSwipeObject);
						console.log(swipeObject.priority);
						SwipeFactory.add(swipeObject, cords);
					},
					move: function(cords) {
						console.log(SwipeFactory.swipeObject, cords, SwipeFactory.swipeObject.move());
					},
					end: function(cords) {
						SwipeFactory.swipeObject.end(cords);
						SwipeFactory.reset();
					},
					cancel: function(cords){
						SwipeFactory.swipeObject.cancel(cords);
						SwipeFactory.reset();
					}
				})
				console.log(attrs.ngSwipeObject);
			}
		};
	});

	ngSwipeHandler.factory('SwipeFactory', function(){
		var sampleSwipeObject = {
			priority: 0,
			move: function(){},
			end: function(){},
			cancel: function(){},
			startCords: {
				x:0,
				y:0
			}
		};

		return {
			swipeObject: Object.create(sampleSwipeObject),
			reset: function() {
				this.swipeObject = Object.create(sampleSwipeObject);
			},
			add: function(newSwipeObject, cords) {
				var swipeObject = Object.create(sampleSwipeObject);
				newSwipeObject.startCords = cords;

				angular.extend(swipeObject, newSwipeObject);

				if(this.swipeObject) {
					if(swipeObject.priority<this.swipeObject.priority) {
						swipeObject = this.swipeObject;
					}
				}

				this.swipeObject = swipeObject;
			}
		};
	})
})();