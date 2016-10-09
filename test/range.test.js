var Range = require('../app/range.js');

describe('range.js module', function() {

    it('should initialize the constants', function() {
        expect(Range.get('ratio')).toEqual(64);
    });

    it('should calculate a fixed range', function() {
        expect(64).toEqual(Range.getRange());
        expect(65).not.toEqual(Range.getRange());
        expect(-1).not.toEqual(Range.getRange());
        expect(0).not.toEqual(Range.getRange());
    });
});
