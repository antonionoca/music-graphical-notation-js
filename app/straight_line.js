'use strict';

var StraightLine = function() {
};

//TODO document
//TODO add tests
StraightLine.prototype.createStraightLines = function(_perlin) {
  //TODO fix magic numbers
  var straightLines = _perlin.generatePerlinNoise(1, 128);
  var i = 0;

  for (i = straightLines.length - 1; i >= 0; i--) {
      straightLines[i] *= 10;
  }
  
  return straightLines;
};

module.exports = StraightLine;
