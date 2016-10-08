'use strict';

var Order = function() {
};

//TODO refactor magic numbers
//TODO document
//TODO add tests
Order.createOrder = function(index) {
  if (typeof index === 'undefined' || index === null) return undefined;

	return index < 11 ? 10 - index : index;
};

module.exports = Order;
