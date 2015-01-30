!function(){app.directive("card",function(){return{restrict:"E",transclude:!0,scope:{},templateUrl:"app/components/shared/card/cardView.html",link:function($scope,iElm,iAttrs){iAttrs.type&&($scope.cardClass="card-"+iAttrs.type)}}})}(window.angular),function(){app.directive("modalButton",function($compile,Modal){return{restrict:"A",priority:1001,terminal:!0,compile:function(){return function(scope,iElement,iAttrs){iElement.attr("ng-click","modal.openModal('',"+iAttrs.modalParams+")"),iElement.removeAttr("modal-button"),iElement.removeAttr("modal-template"),iElement.removeAttr("modal-params");var fn=$compile(iElement);fn(scope),scope.modal=Modal}}}}),app.factory("Modal",function(){return{openModal:function(){}}})}(window.angular),function(angular){app.directive("ngEnter",function(){return function(scope,element,attrs){element.bind("keydown keypress",function(event){13===event.which&&(scope.$apply(function(){scope.$eval(attrs.ngEnter)}),event.preventDefault())})}}),app.filter("coin",function(){return function(money,cases,decimal,thousand){var cases=isNaN(cases=Math.abs(cases))?2:cases,decimal=void 0==decimal?".":decimal,thousand=void 0==thousand?",":thousand,negative=0>money?"-":"",integer=parseInt(money=Math.abs(+money||0).toFixed(cases))+"",leftover=(leftover=integer.length)>3?leftover%3:0;return negative+(leftover?integer.substr(0,leftover)+thousand:"")+integer.substr(leftover).replace(/(\d{3})(?=\d)/g,"$1"+thousand)+(cases?decimal+Math.abs(money-integer).toFixed(cases).slice(2):"")}}),app.filter("absolute",function(){return function(number){return Math.abs(number)}}),app.filter("group",function(){return function(data,groupSize){for(var group=[],i=1;data[groupSize*(i-1)];)group.push(data.slice(groupSize*(i-1),groupSize*i)),i++;return group}}),app.filter("capitalize",function(){return function(name){if(name){var namePieces=name.split(" "),capitalizedName=[];return angular.forEach(namePieces,function(piece){capitalizedName.push(piece[0].toUpperCase()+piece.slice(1))}),capitalizedName.join(" ")}}})}(window.angular);