angular.module('Flashcards.common').directive('keypress', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function($scope, element, attrs) {
			var keymap = eval('keymap = ' + attrs.keypress);
			for (var keyCode in keymap) {
				keymap[keyCode] = $parse(keymap[keyCode])($scope);
			}
			$(document.body).on('keydown', function(event) {
				if (keymap[event.which]) {
					keymap[event.which]();
				}
				$scope.$apply();
			});
		}
	};
}]);