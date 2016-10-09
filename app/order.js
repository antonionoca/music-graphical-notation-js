'use strict';

var Order = function() {
};

Order.get = function(name) {
	var constants = {
		'THRESHOLD': 11,
		'INVERTER':  10
	};

	return constants[name];
};

Order.createOrder = function(index) {
	if (typeof index === 'undefined' || index === null) {
		return undefined;
	}

	if (index < Order.get('THRESHOLD')) {
		return Order.get('INVERTER') - index;
	}
	
	return index;
};

module.exports = Order;
