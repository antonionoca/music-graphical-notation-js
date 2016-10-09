'use strict';

var Range = function() {
};

Range.get = function(name) {
	var constants = {
		'RATIO': 64
	};

	return constants[name];
};

Range.getRange = function() {
	return Range.get('RATIO');
};

module.exports = Range;
