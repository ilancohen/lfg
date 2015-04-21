angular.module('LFG.Group').directive('tabDisable', [function() {
	return {
		link: function($scope, element, attrs) {
			$scope.$watch('data.selectedCollege', function(){
				if (!$scope.isCollegeSelected()) {
					element.attr('disabled', '');
				} else {
					element.removeAttr('disabled');
				}
			});
		}
	};
}]);
