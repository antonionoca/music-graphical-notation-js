'use strict';

var Range = function() {
};

//TODO understand magic numbers
//TODO refactor magic numbers
Range.prototype.getRange = function() {
    return 512 / 8;
};

module.exports = Range;
