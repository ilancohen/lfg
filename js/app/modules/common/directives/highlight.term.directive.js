angular.module('Flashcards.common').directive('highlightTerm', [function() {
	return {
		restrict: 'A',
		scope: {
			term: '=',
			content: '='
		},
		link: function($scope, elem, attrs) {
			$scope.$watch('term', setContent);
			$scope.$watch('content', setContent);

			function setContent() {
				var html = $scope.content;
				var regex = new RegExp('(' + $scope.term + ')', 'gi');
				html = html.replace(regex, '<span class="highlighted">$1</span>');
				elem.html(html);
			}
		}
	}
}]);
