angular.module('Flashcards.common').directive('editable', ['$compile', 'utilities', function($compile, utilities) {
	return {
		restrict: 'A',
		scope: {
			model: '=ngModel'
		},
		link: function($scope, elem, attrs) {
			// Allowing for dynamically applying the directive.
			if (utilities.stringToBoolean(attrs.editableInactive)) {
				return;
			}
			var template = '<div class="' + attrs.editableClass + '" style="display:none;">{{model}}</div>';
			var label = $compile(template)($scope);
			var isFocused = false;
			var parent = elem.parent();
			elem.after(label);

			elem.on('focus', function(){
				isFocused = true;
				parent.addClass('focus');
			});
			elem.on('blur', function(){
				isFocused = false;
				checkForShow();
				elem.parent().removeClass('focus');
			});
			elem.on('keypress', function(event){
				if (event.which === 13) {
					elem[0].blur();
				}
			});
			$scope.$watch('model', checkForShow);

			label.on('click', function() {
				label.css('display', 'none');
				elem.css('display', '');
				elem[0].focus();
			});
			function checkForShow() {
				if ($scope.model && !isFocused) {
					elem.css('display', 'none');
					label.css('display', '');
				}
				if (!$scope.model) {
					parent.addClass('editable-empty');
				} else {
					parent.removeClass('editable-empty');
				}
			}
		}
	};
}]);