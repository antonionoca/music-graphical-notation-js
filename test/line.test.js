var assert = require('assert');
var Line = require('../line.js');

var line;

describe('Sample Test', function() {

	beforeAll(function() {
		line = new Line(0,0,0,0,0,[0]);
	});

	it('should create splines', function() {
		var noise = [0,0,0,0];
    var size = {x:480, y:30};
    var ratio = 1.244;

    var splines = line.createSplines(noise, size,ratio);
    assert.equal(4, splines.length);
	});
});
