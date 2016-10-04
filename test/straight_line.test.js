var StraightLine = require('../app/straight_line.js');
var perlin   = require('perlin-noise');

var straightLine;

describe('straight_line.js module', function() {
  beforeAll(function() {
    straight_line = new StraightLine();
  });

  it('should create straight lines', function() {
    straight_line.createStraightLines(perlin);
  });
});
