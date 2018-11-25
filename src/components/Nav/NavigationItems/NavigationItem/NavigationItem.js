import React from 'react';

import classes from './NavigationItem.css';

const navItem = (props) => (
  <li className={classes.NavigationItem}>
    <a 
      href={props.link}
      className={props.active ? classes.afctive : null}>{props.children}</a>
  </li>
);

export default navItem;
