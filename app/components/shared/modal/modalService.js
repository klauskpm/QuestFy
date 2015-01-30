(function(angular) {
	app.directive('modalButton', function($compile, Modal) {
		return {
			restrict: 'A',
	 		priority: 1001,
			terminal: true,
			compile: function compile(elm, attrs, transclude) {
				return function postLink(scope, iElement, iAttrs, controller) {
					iElement.attr('ng-click', "modal.openModal(''," + iAttrs.modalParams + ")");

					iElement.removeAttr('modal-button');
					iElement.removeAttr('modal-template');
					iElement.removeAttr('modal-params');

					

					var fn = $compile(iElement);
					fn(scope);

					scope.modal = Modal;
				}
			}
		}
	});

	app.factory('Modal', function(){
		return {
			openModal: function(modalTemplate, modalParams) {
				// console.log(modalParams);
			}
		}
	});
})(window.angular);