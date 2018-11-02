import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {
  const mappedIngredients = Object.keys(props.ingredients)
    .map(ingredient => {
      return [...Array(props.ingredients[ingredient])]
        .map((_, i) => {
          return <BurgerIngredient key={ingredient + i} type={ingredient} />
        })
    });
  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bread-top" />
      {mappedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default burger;
