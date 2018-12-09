import React, { Component } from 'react';
import Aux from '../Aux';
import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import SideDrawer from '../../components/Nav/SideDrawer/SideDrawer';

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
