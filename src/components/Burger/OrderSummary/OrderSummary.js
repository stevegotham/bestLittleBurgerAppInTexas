import React from 'react';

import Aux from '../../../HOC/Aux';
import Button from '../../UI/Button/Button';

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
      <h4>Your Total: <span>{props.orderTotal.toFixed(2)}</span></h4>
      <ul>
        {ingredients}
      </ul>
      <p>Proceed to Checkout?</p>
      <Button 
        btnType="Danger"
        clicked={props.cancel}>Cancel</Button>
      <Button 
        btnType="Success"
        clicked={props.continue}>Continue</Button>
    </Aux>
  );
}

export default orderSummary;
