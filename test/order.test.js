var Order = require('../app/order.js');

describe('Order.js module', function() {

    it('should initialize constants', function() {
        expect(Order.get('THRESHOLD')).toEqual(11);
        expect(Order.get('INVERTER')).toEqual(10);
    });

    it('should create an order based on an index', function() {
        expect(Order.createOrder(0)).toEqual(Order.get('INVERTER'));
        expect(Order.createOrder(1)).toEqual(9);
        expect(Order.createOrder(2)).toEqual(8);
        expect(Order.createOrder(10)).toEqual(0);
        expect(Order.createOrder(11)).toEqual(Order.get('THRESHOLD'));
        expect(Order.createOrder(12)).toEqual(12);
        expect(Order.createOrder(-1)).toEqual(Order.get('THRESHOLD'));
    });

    it('should return undefined when receiving undefined or null', function() {
        expect(Order.createOrder()).toEqual(undefined);
        expect(Order.createOrder(null)).toEqual(undefined);
    });
});
