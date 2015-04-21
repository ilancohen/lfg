angular.module('LFG.Group').controller('GroupController', ['$scope', '$mdDialog', '$mdToast', 'dataService', function($scope, $mdDialog, $mdToast, dataService){
	$scope.colleges = [
		'Cornell University',
		'Stanford University',
		'Brown University'
	];
	$scope.data = {};
	$scope.data.selectedCollege = '';

	$scope.tabClick = function(ev) {
		if (!$scope.isCollegeSelected()){
			ev.stopPropagation();
		}
	};

	$scope.$watch(function() {return dataService.getAllData()}, function(newData){
		localStorage.setItem('data', angular.toJson(newData));
	}, true);

	$scope.me = dataService.getPerson('me');

	$scope.getColWidth = function(col){
		if (col === 'courses') {
			if (isDefined($scope.selectedGroup)) {
				return 33;
			} else if (isDefined($scope.selectedCourse)) {
				return 50;
			} else {
				return 100;
			}
		}

		if (col === 'groups') {
			if (isDefined($scope.selectedGroup)) {
				return 33;
			} else if (isDefined($scope.selectedCourse)) {
				return 50;
			} else {
				return 0;
			}
		}

		if (col === 'people') {
			if (isDefined($scope.selectedGroup)) {
				return 33;
			} else {
				return 0;
			}
		}
	};

	$scope.isItemShown = function(type) {
		if (type === 'groups') {
			return isDefined($scope.selectedCourse);
		}

		if (type === 'people') {
			return isDefined($scope.selectedGroup);
		}

		if (type === 'myPeople') {
			return isDefined($scope.mySelectedGroup);
		}

		return false;
	};

	$scope.getCourses = function() {
		return dataService.getCourses();
	};

	$scope.getGroups = function(courseId) {
		if (typeof courseId === 'undefined') {
			courseId = null;
		}
		return dataService.getGroups(courseId);
	};

	$scope.getMyGroups = function() {
		return dataService.getGroupsByMember('me');
	};

	$scope.getPeople = function(groupId) {
		if (typeof groupId === 'undefined') {
			groupId = null;
		}
		return dataService.getPeople(groupId);
	};

	function isDefined(a) {
		return typeof a !== 'undefined';
	}

	$scope.selectCourse = function(courseId) {
		if ($scope.selectedCourse === courseId) {
			delete $scope.selectedCourse;
			$scope.selectGroup();
		} else {
			$scope.selectedCourse = courseId;
		}
	};

	$scope.selectGroup = function(groupId) {
		if ($scope.selectedGroup === groupId || !isDefined(groupId)) {
			delete $scope.selectedGroup;
		} else {
			$scope.selectedGroup = groupId;
		}
	};

	$scope.selectMyGroup = function(groupId) {
		if ($scope.mySelectedGroup === groupId || !isDefined(groupId)) {
			delete $scope.mySelectedGroup;
		} else {
			$scope.mySelectedGroup = groupId;
		}
	};

	$scope.joinGroup = function(groupId, ev) {
		if (ev) {
			ev.stopPropagation();
		}
		$scope.addPersonToGroup($scope.me.id, groupId);
	};

	$scope.leaveGroup = function(groupId, ev) {
		if (ev) {
			ev.stopPropagation();
		}
		$scope.removePersonFromGroup($scope.me.id, groupId);
	};

	$scope.getGroupSize = function(groupId) {
		var people = $scope.getPeople(groupId);
		return people.length;
	};

	$scope.selectPerson = function(person, ev) {
		$scope.selectedPerson = person;
		$mdDialog.show({
			controller: 'DialogCtrl',
			templateUrl: 'partials/person.dialog.html',
			targetEvent: ev,
			locals: {
				items: {
					person: $scope.selectedPerson,
					test: 'test!'
				}
			}
		});
	};

	$scope.showAddCourse = function(ev) {
		$mdDialog.show({
			controller: 'DialogCtrl',
			templateUrl: 'partials/add.course.dialog.html',
			targetEvent: ev,
			locals: {
				items: {
					course: {}
				}
			}
		}).then(function(newCourse){
			if (!newCourse) {
				return;
			}
			$scope.addCourse(newCourse);
			var toast = $mdToast.simple().content('Course Added!');
			$mdToast.show(toast);
		}, function(){

		});
	};

	$scope.showAddGroup = function(courseId, ev) {
		$mdDialog.show({
			controller: 'DialogCtrl',
			templateUrl: 'partials/add.group.dialog.html',
			targetEvent: ev,
			locals: {
				items: {
					group: {
						courseId: courseId
					}
				}
			}
		}).then(function(newGroup){
			if (!newGroup) {
				return;
			}
			$scope.addGroup(newGroup);
			var toast = $mdToast.simple().content('Group Added!');
			$mdToast.show(toast);
		}, function(){

		});
	};

	$scope.showAddPerson = function(groupId, ev) {
		$mdDialog.show({
			controller: 'DialogCtrl',
			templateUrl: 'partials/add.person.dialog.html',
			targetEvent: ev,
			locals: {
				items: {
					person: {
						groups: [groupId]
					}
				}
			}
		}).then(function(newPerson){
			$scope.addPerson(newPerson);
			var toast = $mdToast.simple().content('Person Added!');
			$mdToast.show(toast);
		}, function(){

		});
	};

	$scope.isCollegeSelected = function() {
		return $scope.data.selectedCollege.trim() !== '';
	};

	$scope.addCourse = function(newCourse) {
		dataService.saveCourse(newCourse);
	};

	$scope.addGroup = function(newGroup) {
		dataService.saveGroup(newGroup);
	};

	$scope.addPerson = function(newPerson) {
		dataService.savePerson(newPerson);
	};

	$scope.addPersonToGroup = function(personId, groupId) {
		var person = dataService.getPerson(personId);
		if (person) {
			person.groups.push(groupId);
		}
		dataService.savePerson(person);
	};

	$scope.removePersonFromGroup = function(personId, groupId, ev) {
		if (ev) {
			ev.stopPropagation();
		}
		var person = dataService.getPerson(personId);
		if (person) {
			var index = person.groups.indexOf(groupId);
			if (index !== -1) {
				person.groups.splice(index,1);
			}
		}
		dataService.savePerson(person);
	};

	$scope.isInGroup = function(personId, groupId) {
		return dataService.isPersonInGroup(personId, groupId);
	}
}]).controller('DialogCtrl', ['$scope', '$mdDialog', 'items', function($scope, $mdDialog, items){
	$scope.items = items;
	$scope.hideDialog = function(msg) {
		$mdDialog.hide(msg);
	};
}]);