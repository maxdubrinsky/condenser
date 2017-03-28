import React from 'react';
import styles from './Header.css';
import {connector} from '../../reducers/header';

const updateField = onChange => e => onChange(e.target.value);

const Header = ({onSubmit, onChange, loading}) => (
  <div className={styles.container}>
    <form onSubmit={onSubmit} method='get'>
      <input type='text' name='users' onChange={updateField(onChange('users'))} />
      <input type='submit' value='Search' />
    </form>
    {loading ? <span>Loading...</span> : null}
  </div>
);

Header.propTypes = {
  loading: React.PropTypes.bool,
  users: React.PropTypes.string
}

export default connector(Header);
