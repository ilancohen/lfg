angular.module('Flashcards.common').factory('utilities', [function() {
	function s4() {
		return (Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)).toUpperCase();
	}

	function generateId() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4();
	}

	function stringToBoolean(string){
		if (typeof string === 'undefined') {
			return;
		}
		switch(string.toLowerCase()){
			case "true": case "yes": case "1": return true;
			case "false": case "no": case "0": case null: return false;
			default: return Boolean(string);
		}
	}

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

	return {
		generateId: generateId,
		stringToBoolean: stringToBoolean,
        shuffle: shuffle
	}
}]);