import DiscountFunctions from '../DiscountFunctions';

let mockOrder, mockOrderTwo, mockOrderPlusDiscount, mockOrderFour;
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

  mockOrderTwo = {
      'id': '1',
      'customer-id': '1',
      'items': [],
      'total': '',
    };

    mockOrderPlusDiscount = {
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
      'discounts': {
        'a': {
          'reduction': '1.95'
        },
        'b': {
          'reduction': '4.99'
        }
      },
      'total': '122.37',
    };
    mockOrderFour = {
    "id": "3",
    "customer-id": "3",
    "items": [
      {
        "id": "A102",
        "quantity": "2",
        "unit-price": "49.50",
        "total": "99.00"
      },
    ],
    "total": "99.00"
  }


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

describe('isDiscountTwo', () => {
  it('if there are 5 products of category B it returns true', () => {
    expect(DiscountFunctions.isDiscountTwo(mockOrder)).toEqual(true)
  });
  it('if there are less than 5 products of category B it returns false', () => {
    expect(DiscountFunctions.isDiscountTwo(mockOrderTwo)).toEqual(false)
  });
});

describe('isDiscountOne', () => {
  it('if there are 2 or more products of category A/1 it returns true', () => {
    expect(DiscountFunctions.isDiscountOne(mockOrder)).toEqual(true)
  });
  it('if there are less than 2 products of category A/1 it returns false', () => {
    expect(DiscountFunctions.isDiscountOne(mockOrderTwo)).toEqual(false)
  });
});

describe('Discounter', () => {
  let discounts = {
    'a': {
      'reduction': '1.95'
    },
    'b': {
      'reduction': '4.99'
    }
  }
  it('will create a field in the order object called discount if one of the discount conditions are met', () => {
    DiscountFunctions.Discounter(mockOrder)
    expect(Object.keys(mockOrder).length).toEqual(5)
  });
  it('will create a discount for category 1/A when appropiate', () => {
    DiscountFunctions.Discounter(mockOrder)
    expect(mockOrder.discounts.a).toEqual(discounts.a)
  });
  it('will not create a discount for category 1/A when not appropiate', () => {
    let mockOrderThree = {
        'id': '1',
        'customer-id': '1',
        'items': [],
        'total': '',
      };
    expect(DiscountFunctions.Discounter(mockOrderTwo)).toEqual(mockOrderThree)
  });
  it('if the conditions are met for category 1/A it will reduce the price of the cheapest by 20%', () => {
    DiscountFunctions.Discounter(mockOrder)
    expect(mockOrder.discounts.a.reduction).toEqual(discounts.a.reduction)
    DiscountFunctions.Discounter(mockOrderFour)
    expect(mockOrderFour.discounts.a.reduction).toEqual('9.90')
  });


  it('will create a discount for category 2/B when appropiate', () => {
    DiscountFunctions.Discounter(mockOrder)
    expect(mockOrder.discounts.b).toEqual(discounts.b)
  });
});

});

describe('discountGeneratorOne', () => {
    it('finds the cheapest tool item of class A/1 and returns 20% of its value', () => {
        expect(DiscountFunctions.discountGeneratorOne(mockOrderFour)).toEqual('9.90')
        expect(DiscountFunctions.discountGeneratorOne(mockOrder)).toEqual('1.95')
    });
});

describe('discountGeneratorTwo', () => {
  it('returns the price of the sixth item for free', () => {
    expect(DiscountFunctions.discountGeneratorTwo(mockOrder)).toEqual('4.99')
  });

  it('')
});
