import React, {Component} from 'react';
import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  lettuce: .6,
  bacon: .75,
  cheese: .35,
  meat: 1.2
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 3.5,
    orderable: false,
    checkingOut: false,
    loading: false,
    error: null
  }

  componentDidMount() {
    axios.get('https://best-little-burger-backend.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        this.setState({
          error: error
        });
      });
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

  checkoutHandler = () => {
    this.setState({checkingOut: true})
  }
  
  cancelCheckoutHandler = () => {
    this.setState({checkingOut: false})
  }
  
  continueCheckoutHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Stevie G',
        addresss: {
          street: '123 Main St',
          zipCode: 90210,
          vip: true
        },
        email: 'test@test.com',         
      },
      deliveryMethod: 'cheapest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({
          loading: false,
          checkingOut: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          checkingOut: false
        });
      });
  }

  render () {

    const disabledIngredients = {
      ...this.state.ingredients
    };
    for (let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] <= 0;
    }
    
    let orderSummary = null;
    let burger = this.state.error ? <p>Things have gone terribly wrong!</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledIngredients}
            price={this.state.totalPrice}
            orderable={this.state.orderable}
            checkout={this.checkoutHandler} />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.cancelCheckoutHandler}
          continue={this.continueCheckoutHandler}
          orderTotal={this.state.totalPrice} />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    
    return (
      <Aux>
        <Modal 
          show={this.state.checkingOut}
          clicked={this.cancelCheckoutHandler}>
        {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }

}

export default withErrorHandler(BurgerBuilder, axios);
