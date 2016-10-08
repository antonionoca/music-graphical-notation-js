var Range = require('../app/range.js');

describe('range.js module', function() {

  it('should calculate a fixed range', function() {
    expect(64).toEqual(Range.getRange());
    expect(65).not.toEqual(Range.getRange());
  });
});
