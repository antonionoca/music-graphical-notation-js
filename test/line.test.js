var assert = require('assert');
var Line = require('../line.js');

var line;

describe('SpLine using Perlin Noise', function() {

	beforeAll(function() {
		line = new Line(0,0,0,0,0,[0]);
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

  describe('getRatio function', function() {
  
    it('should return null when no argument is passed', function() {
      assert.equal(null, line.getRatio());
    });

    it('should not try to divide by zero', function() {
      assert.equal(null, line.getRatio(0,0));
    });

    it('should apply a simple division', function() {
      assert.equal(2, line.getRatio(2,1));
      assert.equal(1, line.getRatio(2,2));
      assert.equal(2, line.getRatio(4,2));
      assert.equal(2.5, line.getRatio(5,2));
    });

  });

});
