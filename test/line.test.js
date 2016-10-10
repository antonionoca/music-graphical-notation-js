var assert = require('assert');
var Line = require('../app/line.js');

var line;

describe('SpLine using Perlin Noise', function() {

	beforeAll(function() {
		line = new Line(0,0,0,0,0,[0]);
	});
	
	it('should initialize constant values', function() {
		expect(Line.get('PADDING')).toEqual(-20);
		expect(Line.get('LINE_WIDTH')).toEqual(3);
		expect(Line.get('MULTIPLIER')).toEqual(0.04);
		expect(Line.get('DIVISOR')).toEqual(11);
		expect(Line.get('POINTS')).toEqual(511);
	});

	describe('createSplines function', function() {

		it('should create splines', function() {
			var noise = [0,0,0,0];
			var size = {x:480, y:30};
			var ratio = 1.244;

			var splines = line.createSplines(noise, size,ratio);
			assert.equal(4, splines.length);
		});

	});

	describe('update function', function() {

		it('should set verticesNeedUpdate to true', function() {
			line.update([0]);
			assert.equal(true, line.mesh.geometry.verticesNeedUpdate);
		});

		it('should return null when there are null vertices', function() {
			line.geometry.vertices = null;
			assert.equal(null, line.update());
		});

		it('should return null when there are no vertices', function() {
			line.geometry.vertices = []; 
			assert.equal(null, line.update());
		});

	});

	describe('generatedPoints function', function() {

		it('should return null when no argument is passed', function() {
			assert.equal(null, line.generatedPoints());
		});

		it('should return randomnized line when argument is an empty array', function() {
			expect(line.generatedPoints([])).not.toBe(line.generatedPoints([]));
		});

		it('should return randomnized line when argument is the same', function() {
			expect(line.generatedPoints([0])).not.toBe(line.generatedPoints([0]));
		});
	});
});
