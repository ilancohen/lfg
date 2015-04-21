angular.module('Flashcards.common').directive('autoheight', [function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function($scope, elem, attrs, ngModel) {
			var element = elem[0];

			element.addEventListener('focus', expand, false);
			element.addEventListener('keyup', expand, false);
			$scope.$watch(ngModel.$modelValue, expand);

			function expand() {
				element.style.overflow = 'hidden';
				element.style.height = 0;
				element.style.height = element.scrollHeight + 'px';
			}
		}
	};
}]);