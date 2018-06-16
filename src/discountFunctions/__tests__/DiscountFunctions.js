import DiscountFunctions from '../DiscountFunctions';

let mockOrder;
beforeEach(() => {
  mockOrder = {
    'id': '1',
    'customer-id': '1',
    'items': [
      {
        'id': 'A101',
        'quantity': '6',
        'unit-price': '9.75',
        'total': '58.50',
      },
      {
        'id': 'B103',
        'quantity': '2',
        'unit-price': '12.95',
        'total': '25.90',
      },
      {
        "id": "B102",
        "quantity": "10",
        "unit-price": "4.99",
        "total": "49.90"
      },
    ],
    'total': '134.30',
  };
})
describe('totalByTwo', () => {

  it('doubles the amount', () => {
    let order = {
      total: 10,
    };
    expect(DiscountFunctions.totalByTwo(order)).toEqual(20);
  });
});

describe('CategoryCounter', () => {
  it('can count the number of items of category 2/ product id B', () => {
    expect(DiscountFunctions.CategoryCounter(mockOrder, 'B')).toEqual(12)
  });

  it('can count the number of items of category 1/ product id A', () => {
    expect(DiscountFunctions.CategoryCounter(mockOrder, 'A')).toEqual(6)
  });
});

describe('isCategory', () => {
  it('returns true when the product is category 1/A', () => {
    expect(DiscountFunctions.isCategory(mockOrder, 'A', 0)).toBe(true)
  });

  it('returns true when the product is category 2/B', () => {
    expect(DiscountFunctions.isCategory(mockOrder, 'B', 1)).toBe(true)
  });

  it('returns false when the product category is not what is asked for', () => {
    expect(DiscountFunctions.isCategory(mockOrder, 'B', 0)).toBe(false)
  });

describe('DiscountTwo', () => {
  it('if there are 5 products of category B the sixth is free ', () => {
    expect(DiscountFunctions.DiscountTwo(mockOrder).toEqual())
  });
});

});
