import React from 'react';

function DiscountDisplay(props) {
  return (
    <div>
      <p>Total: {props.order.total}</p>
      <p className='discount'>Discount: </p>
    </div>
  );
}

export default DiscountDisplay;
