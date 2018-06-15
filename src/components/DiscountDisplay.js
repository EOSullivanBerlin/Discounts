import React from 'react';

function DiscountDisplay(props) {
  return (
    <div>
      <p>Total: {props.order.total}</p>
    </div>
  );
}

export default DiscountDisplay;
