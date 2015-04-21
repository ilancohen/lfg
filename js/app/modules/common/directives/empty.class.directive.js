angular.module('Flashcards.common').directive('emptyClass', [function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function($scope, elem, attrs, ngModel) {
			var emptyClass = attrs.emptyClass || 'empty';
			$scope.$watch(function() {
                return ngModel.$modelValue;
            }, checkClass, true);

			function checkClass() {
				if (!ngModel.$viewValue || ngModel.$viewValue.trim() == '') {
					elem.addClass(emptyClass)
				} else {
					elem.removeClass(emptyClass);
				}
			}
			checkClass();
		}
	};
}]);