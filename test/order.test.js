var Order = require('../app/order.js');

var order;

describe('Order.js module', function() {
  beforeAll(function() {
    order = new Order();
  });

  it('should create an order based on an index', function() {
    expect(order.createOrder(0)).toEqual(10);
    expect(order.createOrder(1)).toEqual(9);
    expect(order.createOrder(2)).toEqual(8);
    expect(order.createOrder(10)).toEqual(0);
    expect(order.createOrder(11)).toEqual(11);
    expect(order.createOrder(12)).toEqual(12);
    expect(order.createOrder(-1)).toEqual(11);
  });
  
  it('should return undefined when receiving undefined or null', function() {
    expect(order.createOrder()).toEqual(undefined);
    expect(order.createOrder(null)).toEqual(undefined);
  });
});
