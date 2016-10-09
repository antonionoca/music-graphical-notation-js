var StraightLine = require('../app/straight_line.js');
var perlin   = require('perlin-noise');

var straightLine;

describe('straight_line.js module', function() {
    beforeAll(function() {
        straight_line = new StraightLine();
    });

    it('should initialize constants', function() {
        expect(StraightLine.get('HEIGHT')).toEqual(1);
        expect(StraightLine.get('WIDTH')).toEqual(128);
        expect(StraightLine.get('MULTIPLIER')).toEqual(10);
    });

    it('should create straight lines', function() {
        var output = straight_line.createStraightLines(perlin);
        expect(output.length).toEqual(StraightLine.get('WIDTH'));
    });
});
