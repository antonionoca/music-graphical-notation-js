'use strict';

var Ratio = function() {
};

Ratio.getRatio = function(x, noiseLength) {
	return !noiseLength ? null : x / noiseLength;
};

module.exports = Ratio;
