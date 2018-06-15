import React from 'react';
import { shallow, mount, render } from 'enzyme';
import DiscountDisplay from '../DiscountDisplay';



describe('Discount Display', () => {
  let Testorder = {
    total: 10,
  }
  it('should render without throwing an error', () => {
    expect(shallow(<DiscountDisplay order={Testorder} />).find('p.discount').exists()).toBe(true);
  });
});
