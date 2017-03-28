import {Map, fromJS} from 'immutable';
import {compose} from 'redux';
import {createReducer, createAction} from 'redux-act';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import Actions from '../actions';
import 'whatwg-fetch';

const LocalActions = {
  change: createAction('Update state with field values', (field, value) => ({field, value})),
  done: createAction('Search is complete')
}

const initialState = Map({
  users: '',
  loading: false
});

const reducer = createReducer({
  [LocalActions.change]: (state, {field, value}) => state.set(field, value),
  [LocalActions.done]: state => state.set('loading', false),
  [Actions.search]: state => state.set('loading', true)
}, initialState);

const mapStateToProps = (state, props) => state.get('header').toObject();

const mapDispatchToProps = (dispatch) => ({
  onChange: field => value => dispatch(LocalActions.change(field, value)),
  onSubmit: e => {
    const users = e.target.users.value;
    e.preventDefault();
    dispatch(Actions.search());
    return fetch(`/api/games?${users}`)
      .then(res => res.json())
      .then(data => dispatch(Actions.updateDisplay(data)))
      .then(() => dispatch(LocalActions.done()));
  }
});

export const connector = compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure
);

export default reducer;
