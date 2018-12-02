import React, { Component } from 'react';
import Aux from '../../HOC/Aux';
import Toolbar from '../Nav/Toolbar/Toolbar';
import SideDrawer from '../Nav/SideDrawer/SideDrawer';

import classes from './Layout.css';


class Layout extends Component {
  
  state = {
    showSideDrawer: false
  }
  
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }
  sideDrawerOpenedHandler = () => {
    this.setState({
      showSideDrawer: true
    })
  }
  
  
  
  render() {
    
    return (
      <Aux>
        <Toolbar clicked={this.sideDrawerOpenedHandler}/>
        <SideDrawer 
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
    
  }
}

export default Layout;
