import React from 'react';

import Aux from '../../../HOC/Aux';

const orderSummary = (props) => {
  
  const ingredients = Object.keys(props.ingredients)
    .map(key => {
      return (
        <li key={key}>
          <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
        </li>
      )
    })
  
  return (
    <Aux>
      <h3>Your Order</h3>
      <ul>
        {ingredients}
      </ul>
      <p>Proceed to Checkout?</p>
    </Aux>
  );
}

export default orderSummary;
