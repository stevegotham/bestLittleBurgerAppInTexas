import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {
  let mappedIngredients = Object.keys(props.ingredients)
    .map(ingredient => {
      return [...Array(props.ingredients[ingredient])]
        .map((_, i) => {
          return <BurgerIngredient key={ingredient + i} type={ingredient} />
        });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

    if (mappedIngredients.length === 0) {
      mappedIngredients = <p>Add some ingredients to build your burger!!</p>;
    }

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bread-top" />
      {mappedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default burger;
