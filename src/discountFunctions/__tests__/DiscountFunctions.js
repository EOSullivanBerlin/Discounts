import DiscountFunctions from '../DiscountFunctions';

let mockOrder, mockOrderTwo, mockOrderPlusDiscount, mockOrderFour, customers;
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

  customers = [
  {
    "id": "1",
    "name": "Coca Cola",
    "since": "2014-06-28",
    "revenue": "492.12"
  },
  {
    "id": "2",
    "name": "Teamleader",
    "since": "2015-01-15",
    "revenue": "1505.95"
  },
  {
    "id": "3",
    "name": "Jeroen De Wit",
    "since": "2016-02-11",
    "revenue": "0.00"
  }
],

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
    },
    'c': {
      'reduction': '13.43'
    }
  }
  it('will create a field in the order object called discount if one of the discount conditions are met', () => {
    DiscountFunctions.Discounter(mockOrder, customers[0])
    expect(Object.keys(mockOrder).length).toEqual(5)
  });
  it('will create a discount for category 1/A when appropiate', () => {
    DiscountFunctions.Discounter(mockOrder, customers[0])
    expect(mockOrder.discounts.a).toEqual(discounts.a)
  });
  it('will not create a discount for category 1/A when not appropiate', () => {
    let mockOrderThree = {
        'id': '1',
        'customer-id': '1',
        'items': [],
        'total': '',
      };
    expect(DiscountFunctions.Discounter(mockOrderTwo, customers[0])).toEqual(mockOrderThree)
  });
  it('if the conditions are met for category 1/A it will reduce the price of the cheapest by 20%', () => {
    DiscountFunctions.Discounter(mockOrder, customers[0])
    expect(mockOrder.discounts.a.reduction).toEqual(discounts.a.reduction)
    DiscountFunctions.Discounter(mockOrderFour, customers[0])
    expect(mockOrderFour.discounts.a.reduction).toEqual('9.90')
  });


  it('will create a discount for category 2/B when appropiate', () => {
    DiscountFunctions.Discounter(mockOrder, customers[0])
    expect(mockOrder.discounts.b).toEqual(discounts.b)
  });
  it('will create a discount for category 3/C when appropiate', () => {
    DiscountFunctions.Discounter(mockOrder, customers[1])
    expect(mockOrder.discounts.c).toEqual(discounts.c)
  })
  it('ill not create a discounts for any categories when not appropiate', () => {
    DiscountFunctions.Discounter(mockOrderTwo, customers[0])
    expect(Object.keys(mockOrder).length).toEqual(4)
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
});

describe('isDiscountThree', () => {
  it('returns true if a cutomer has purchesed over a €1000 in goods', () => {
      expect(DiscountFunctions.isDiscountThree(customers[1])).toBe(true)
  });
  it('returns false if the customer has not purchased over €1000 in goods', () => {
      expect(DiscountFunctions.isDiscountThree(customers[0])).toBe(false)
  });
});

describe('discountGenratorThree', () => {
  let reduction = '13.43';
  let reductionTwo = '9.90';
  it('reduces the entire order by 10%', () => {
    expect(DiscountFunctions.discountGenratorThree(mockOrder)).toEqual(reduction)
    expect(DiscountFunctions.discountGenratorThree(mockOrderFour)).toEqual(reductionTwo)
  })
});
