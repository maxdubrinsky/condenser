import React from 'react';
import {connect} from 'react-redux';
import styles from './Condenser.css';
import Header from '../Header';
import Results from '../Results';

const Condenser = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Header />
      </div>
      <div className={styles.section}>
        <Results />
      </div>
    </div>
  );
}

export default connect()(Condenser);