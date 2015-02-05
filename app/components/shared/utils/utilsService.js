(function(angular){
	app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                            scope.$eval(attrs.ngEnter);
                    });
                    
                    event.preventDefault();
                }
            });
        };
	});

    app.directive('ngMenuSlide', function($swipe, SwipeHandler){
        return {
            restrict: 'A',
            link: function(scope, elm, attrs, controller) {
                var startX;
                $swipe.bind(elm, {
                    start: function(cords){
                        if((window.innerWidth*0.3)>=cords.x) {
                            startX = cords.x;
                            SwipeHandler.isHappening = true;
                        } else {
                            startX = undefined;
                        }
                    },
                    end: function(cords) {
                        if((cords.x - startX)>70) {
                            scope.$apply(function(){
                                scope.$eval(attrs.ngMenuSlide);
                                SwipeHandler.isHappening = false;
                            });
                        }
                        delete startX;
                    }
                });
            }
        };
    });

    app.factory('SwipeHandler', function(){
        return {
            isHappening: false
        };
    })

    app.filter('coin', function() {
        return function(money, cases, decimal, thousand) {
            var cases = isNaN(cases = Math.abs(cases)) ? 2 : cases, 
                decimal = decimal == undefined ? "." : decimal, 
                thousand = thousand == undefined ? "," : thousand, 
                negative = money < 0 ? "-" : "", 
                integer = parseInt(money = Math.abs(+money || 0).toFixed(cases)) + "", 
                leftover = (leftover = integer.length) > 3 ? leftover % 3 : 0;
            return negative + (leftover ? integer.substr(0, leftover) + thousand : "") + integer.substr(leftover).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (cases ? decimal + Math.abs(money - integer).toFixed(cases).slice(2) : "");
        }
    });

    app.filter('absolute', function() {
        return function(number) {
            return Math.abs(number);
        }
    });

    app.filter('group', function() {
        return function(data, groupSize) {
            var group = [],
                i = 1;
            while(data[groupSize*(i-1)]) {
                group.push(data.slice(groupSize*(i-1), groupSize*i));
                i++;
            }
            return group;
        }
    });

    app.filter('capitalize', function() {
        return function(name) {
            if(name) {
                var namePieces = name.split(' '),
                    capitalizedName = [];
                angular.forEach(namePieces, function(piece, index) {
                    capitalizedName.push(piece[0].toUpperCase() + piece.slice(1));
                });
                return capitalizedName.join(' ');
            }
        }
    });
})(window.angular);