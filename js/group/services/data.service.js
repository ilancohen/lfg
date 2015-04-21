angular.module('LFG.Group').service('dataService', ['$rootScope', function($rootScope) {
	var data = {};
	var localStorageData = localStorage.getItem('data') || '{"courses":{"CS101":{"name":"Intro to Computer Science","id":"CS101"},"CS201":{"name":"Data Structures","id":"CS201"},"CS307":{"name":"Algorithms","id":"CS307"},"CS505":{"id":"CS505","name":"Natural Language Processing"}},"groups":{"0":{"name":"CS101 Study Group","courseId":"CS101","id":"0"},"1":{"name":"Let\'s study for the test!","courseId":"CS101","id":"1"},"B27F7FC4-AF53-2AD0-759C-3CCFDB4D":{"courseId":"CS101","name":"AEPi Study Group","id":"B27F7FC4-AF53-2AD0-759C-3CCFDB4D"},"AD258754-4DBA-6727-1224-BFD9CA3B":{"courseId":"CS201","name":"CS201 Study Group","id":"AD258754-4DBA-6727-1224-BFD9CA3B"},"3C2113D1-BA59-6DB1-BB52-076918A7":{"courseId":"CS505","name":"NLP Extra Credit Group","id":"3C2113D1-BA59-6DB1-BB52-076918A7"}},"people":{"0":{"id":"0","name":"Bob Smith","groups":["0","1"]},"1":{"id":1,"name":"Alice Smith","groups":["0"]},"me":{"id":"me","name":"Sample Person","groups":["0","1","3C2113D1-BA59-6DB1-BB52-076918A7"]},"2F4A9C87-3904-C2C8-719F-81E860F2":{"groups":[],"name":"test","id":"2F4A9C87-3904-C2C8-719F-81E860F2"},"B0A2366F-EE4A-AEC5-3834-8E6D104C":{"groups":[],"name":"Jason Bourne","id":"B0A2366F-EE4A-AEC5-3834-8E6D104C"}}}';
	data = angular.fromJson(localStorageData);

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