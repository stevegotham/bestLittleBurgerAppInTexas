import React from 'react';
import Aux from '../../HOC/Aux';
import Toolbar from '../Nav/Toolbar/Toolbar';
import SideDrawer from '../Nav/SideDrawer/SideDrawer';

import classes from './Layout.css';


const layout = (props) => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
)

export default layout;
