var Range = require('../app/range.js');

var range;

describe('range.js module', function() {
  beforeAll(function() {
    range = new Range();
  });

  it('should calculate a fixed range', function() {
    expect(64).toEqual(range.getRange());
    expect(65).not.toEqual(range.getRange());
  });
});
