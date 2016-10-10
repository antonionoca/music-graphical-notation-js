'use strict';

var StraightLine = require('./straight_line');

var Noise = function() {
    this.straightLine = new StraightLine();
};

Noise.get = function(name) {
	var constants = {
		'DIVIDER': 5,
		'THRESHOLD': 20,
		'MULTIPLIER': 1.5,
		'NOISE_DIVIDER': 50
	};

	return constants[name];
};

Noise.prototype.initializeNoise = function(_perlin, range, start, array) {
	return this.straightLine.createStraightLines(_perlin).concat(this.createNoises(range, start, array));
};

Noise.prototype.createNoises = function(range, start, array) {
	var noise = [];
	var i = 0;

	for (i = range + start; i >= start; i--) {
        noise.push(this.createNoise(i, array));
	}

	return noise;
};

//TODO is index out of bounds a bug? or shall we return 5?
Noise.prototype.createNoise = function(i, array) {
    var noise = array[i] / Noise.get('DIVIDER');
    noise = noise > Noise.get('THRESHOLD') ? noise * Noise.get('MULTIPLIER') : noise / Noise.get('NOISE_DIVIDER'); 
    noise = Math.max(Noise.get('DIVIDER'), noise);

    return noise;
};

module.exports = Noise;
