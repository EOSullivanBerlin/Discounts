import DiscountFunctions from '../DiscountFunctions';

describe('totalByTwo', () => {

  it('doubles the amount', () => {
    let order = {
      total: 10,
    };
    expect(DiscountFunctions.totalByTwo(order)).toEqual(20);
  });
});
