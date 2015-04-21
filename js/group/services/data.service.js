angular.module('LFG.Group').service('dataService', ['$rootScope', function($rootScope) {
	var data = {};
	data = angular.fromJson(angular.fromJson(localStorage.getItem('data')));
	data = data || {
		people: {
			me: 'Sample Person',
			groups: [] 
		},
		groups: {

		},
		courses: {

		}
	};

	function s4() {
		return (Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)).toUpperCase();
	}

	function generateId() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4();
	}

	function objectToArray(obj) {
		var arr = [];
		var item;
		for(var id in obj) {
			item = obj[id];
			if (typeof item === 'object') {
				item.id = item.id || id;
			}
			arr.push(item);
		}
		return arr;
	}

	function getCourse(courseId) {
		return data.courses[courseId];
	}

	function saveCourse(course) {
		course.id = course.id || generateId();
		data.courses[course.id] = course;
		return course;
	}

	function getCourses() {
		return objectToArray(data.courses);
	}


	function getGroup(groupId) {
		return data.groups[groupId];
	}

	function saveGroup(group) {
		group.id = group.id || generateId();
		data.groups[group.id] = group;
		return group;
	}

	function getGroups(courseId) {
		var groups = objectToArray(data.groups);

		if (typeof courseId === 'undefined') {
			return groups;
		}
		return groups.filter(function(group) {
			return group.courseId === courseId;
		});
	}

	function getGroupsByMember(personId) {
		var groupIds = data.people[personId].groups;
		var groups = [];

		groupIds.forEach(function(groupId){
			groups.push(getGroup(groupId));
		});

		return groups;
	}


	function getPerson(personId) {
		return data.people[personId];
	}

	function savePerson(person) {
		person.id = person.id || generateId();
		data.people[person.id] = person;
		return person;
	}

	function getPeople(groupId) {
		var people = objectToArray(data.people);

		if (typeof groupId === 'undefined') {
			return people;
		}
		return people.filter(function(person) {
			return person.groups.indexOf(groupId) !== -1;
		});
	}

	function isPersonInGroup(personId, groupId) {
		var person = getPerson(personId);
		return person ? person.groups.indexOf(groupId) !== -1 : false;
	}

	function getAllData() {
		return data;
	}

	return {
		getCourse: getCourse,
		getCourses: getCourses,
		saveCourse: saveCourse,

		getGroup: getGroup,
		getGroups: getGroups,
		getGroupsByMember: getGroupsByMember,
		saveGroup: saveGroup,

		getPerson: getPerson,
		getPeople: getPeople,
		savePerson: savePerson,
		isPersonInGroup: isPersonInGroup,

		getAllData: getAllData
	}

}]);