var Order = require('../app/order.js');

describe('Order.js module', function() {

  it('should create an order based on an index', function() {
    expect(Order.createOrder(0)).toEqual(10);
    expect(Order.createOrder(1)).toEqual(9);
    expect(Order.createOrder(2)).toEqual(8);
    expect(Order.createOrder(10)).toEqual(0);
    expect(Order.createOrder(11)).toEqual(11);
    expect(Order.createOrder(12)).toEqual(12);
    expect(Order.createOrder(-1)).toEqual(11);
  });
  
  it('should return undefined when receiving undefined or null', function() {
    expect(Order.createOrder()).toEqual(undefined);
    expect(Order.createOrder(null)).toEqual(undefined);
  });
});
