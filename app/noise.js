'use strict';

var StraightLine = require('./straight_line');

var Noise = function() {
    this.straightLine = new StraightLine();
};

//TODO add tests
Noise.prototype.initializeNoise = function(_perlin, range, start, array) {
	return this.straightLine.createStraightLines(_perlin).concat(this.createNoises(range, start, array));
};

//TODO add documentation
//TODO add tests
Noise.prototype.createNoises = function(range, start, array) {
	var noise = [];
	var i = 0;

	for (i = range + start; i >= start; i--) {
        noise.push(this.createNoise(i, array));
	}

	return noise;
};

//TODO documentation
//TODO is index out of bounds a bug? or shall we return 5?
Noise.prototype.createNoise = function(i, array) {
    var noise = array[i] / 5;
    noise = noise > 20 ? noise * 1.5 : noise / 50; 
    noise = Math.max(5, noise);

    return noise;
};

module.exports = Noise;
