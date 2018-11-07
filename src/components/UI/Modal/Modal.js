import React from 'react';

import classes from './Modal.css';

const modal = (props) => (
  <div
    className={classes.Modal}
    style={{
      transform: props.checkedOut ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.checkedOut ? '1' : '0' 
    }}>
    {props.children}
  </div>
);

export default modal;
