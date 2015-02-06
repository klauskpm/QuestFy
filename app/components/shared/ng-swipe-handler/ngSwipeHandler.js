(function(){
	'use strict';
	var ngSwipeHandler = angular.module('ngSwipeHandler', ['ngTouch']);

	ngSwipeHandler.directive('ngSwipeAction', function($swipe, SwipeManager){
		return {
			restrict: 'A',
			link: function(scope, elm, attrs, controller) {
				$swipe.bind(elm, {
					start: function(cords) {
						SwipeManager.set(scope.$eval(attrs.ngSwipeAction), cords);
					},
					move: function(cords) {
						SwipeManager.instance.move(cords)
					},
					end: function(cords) {
						SwipeManager.instance.end(cords);
						SwipeManager.reset();
					},
					cancel: function(cords){
						SwipeManager.instance.cancel(cords);
						SwipeManager.reset();
					}
				});
			}
		};
	});

	ngSwipeHandler.factory('SwipeManager', function(SwipeInstance){
		return {
			instance: new SwipeInstance(),
			reset: function() {
				this.instance = new SwipeInstance();
			},
			set: function(swipeObject, cords) {
				swipeObject.cords = cords;

				var swipeIns = new SwipeInstance(swipeObject);

				if(swipeIns.priority>this.instance.priority) {
					this.instance = swipeIns;
				}
			}
		};
	});

	ngSwipeHandler.factory('SwipeInstance', function(){
		return function(options){
			var settings = {
				priority: 0,
				move: function(){},
				end: function(){},
				cancel: function(){},
				cords: {x:0,y:0}
			};

			angular.extend(settings, options);

			this.priority = settings.priority;
			this.move = settings.move;
			this.end = settings.end;
			this.cancel = settings.cancel;
			this.startCords = settings.cords;
		};
	})
})();