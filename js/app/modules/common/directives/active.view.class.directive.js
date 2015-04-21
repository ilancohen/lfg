angular.module('Flashcards.common').directive('activeViewClass', function() {
	return {
		restrict: 'A',
		link: function($scope, element, attrs) {
			if ($scope.activeView) {
				element.attr('view', $scope.activeView);
			}
		}
	};
});