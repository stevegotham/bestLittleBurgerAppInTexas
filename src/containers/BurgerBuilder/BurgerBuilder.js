import React, {Component} from 'react';
import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  lettuce: .6,
  bacon: .75,
  cheese: .35,
  meat: 1.2
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 3.5,
    orderable: false
  }

  updateOrderable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingredient => (ingredients[ingredient]))
      .reduce((sum, el) => {
        return sum += el;
      }, 0);
    this.setState({orderable: sum > 0});
  }
  addIngredientHandler = (type) =>  {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    const oldAmount = this.state.ingredients[type];
    const updatedAmount = oldAmount + 1;
    const priceAdjust = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdjust;
    updatedIngredients[type] = updatedAmount;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updateOrderable(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    const oldAmount = this.state.ingredients[type];
    if (oldAmount === 0) return;
    const updatedAmount = oldAmount - 1;
    const priceAdjust = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAdjust;
    updatedIngredients[type] = updatedAmount;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updateOrderable(updatedIngredients);
  }

  render () {

    const disabledIngredients = {
      ...this.state.ingredients
    };
    for (let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledIngredients}
          price={this.state.totalPrice}
          orderable={this.state.orderable} />
      </Aux>
    );
  }

}

export default BurgerBuilder;
