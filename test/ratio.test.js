var assert = require('assert');
var Ratio = require('../app/ratio.js');

describe('Ratio class', function() {

  describe('getRatio function', function() {
  
    it('should return null when no argument is passed', function() {
      assert.equal(null, Ratio.getRatio());
    });

    it('should not try to divide by zero', function() {
      assert.equal(null, Ratio.getRatio(0,0));
    });

    it('should apply a simple division', function() {
      assert.equal(2, Ratio.getRatio(2,1));
      assert.equal(1, Ratio.getRatio(2,2));
      assert.equal(2, Ratio.getRatio(4,2));
      assert.equal(2.5, Ratio.getRatio(5,2));
    });

  });
});
