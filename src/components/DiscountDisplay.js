import React from 'react';

function DiscountDisplay(props) {
  return (
    <div>
      <p>Total: {props.order.total}</p>
      <p>Discount: {props.DiscountThree(props.order)}</p>
    </div>
  );
}

export default DiscountDisplay;
