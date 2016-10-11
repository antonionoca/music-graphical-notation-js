'use strict';

var StraightLine = function() {
};

StraightLine.get = function(name) {
	var constants = {
		'HEIGHT'     : 1,
		'MULTIPLIER' : 10,
		'WIDTH'      : 128
	};

	return constants[name];
};

StraightLine.prototype.createStraightLines = function(_perlin) {
	var i = 0;
	var straightLines = _perlin.generatePerlinNoise(
		StraightLine.get('HEIGHT'), 
		StraightLine.get('WIDTH'));

	for (i = straightLines.length - 1; i >= 0; i--) {
		straightLines[i] *= StraightLine.get('MULTIPLIER');
	}

	return straightLines;
};

module.exports = StraightLine;
