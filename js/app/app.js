angular.module('LFG', [
    'ngRoute',
	'ngMaterial',
	'LFG.Group'
])
.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo : '/'
		})
		.otherwise({
			redirectTo : '/'
		});
});