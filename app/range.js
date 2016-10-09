'use strict';

var Range = function() {
};

Range.get = function(name) {
	var constants = {
		'ratio': 64
	};

	return constants[name];
};

Range.getRange = function() {
	return Range.get('ratio');
};

module.exports = Range;
