import React from 'react';

function DiscountDisplay(props) {
  return (
    <div>
      <h1> Cutomer: {props.customer.id} </h1>
      <p>Total: {props.order.total}</p>
      <p> Discount for purchasing over a thousand euro in products: {(props.Discount(props.order, props.customer)).c.reduction} </p>
      <p> Discount for buying two type 1/A products: {(props.Discount(props.order, props.customer)).a.reduction} </p>
      <p> Discount for buying six type 2/B products: {(props.Discount(props.order, props.customer)).b.reduction} </p>
      <p> Net Discount: </p>
      <p>Updated Total: </p>
    </div>
  );
}

export default DiscountDisplay;
