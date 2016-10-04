var Range = require('../app/range.js');

var range;

describe('range.js module', function() {
  beforeAll(function() {
    range = new Range();
  });

  it('should calculate a fixed range', function() {
    expect(64).toEqual(64, range.getRange());
  });
});
