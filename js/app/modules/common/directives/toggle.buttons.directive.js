angular.module('Flashcards.common').directive('toggleButtons', function() {
	return {
		restrict: 'E',
		template : '<div class="btn-group">\
						<button type="button"\
							class="btn btn-default"\
							ng-repeat="button in buttons"\
							ng-class="{\'btn-primary\' : button.selected}"\
							ng-click="onClick(button)"\
						>{{ button.label }}</button>\
					</div>',
		scope : {
			buttons : '=',
			selected : '='
		},
		link: function($scope, element, attrs) {
			var selectedButton;

			$scope.onClick = function(button) {
				if (button === selectedButton) {
					return;
				}
				if (selectedButton) {
					selectedButton.selected = false;
				}
				button.selected = true;
				$scope.selected = button.value;
				selectedButton = button;
			};

			$scope.$watch('selected', function() {

			})
		}
	};
});