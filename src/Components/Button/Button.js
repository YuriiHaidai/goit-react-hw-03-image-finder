import React from 'react';
import styles from '../styles.module.css';
import PropTypes from 'prop-types';

const Button = ({ pageChanger }) => {
  return (
    <button type="button" className={styles.Button} onClick={pageChanger}>
      Load more
    </button>
  );
};

Button.propTypes = {
  pageChanger: PropTypes.func.isRequired,
};

export default Button;
