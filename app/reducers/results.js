import {Map, fromJS} from 'immutable';
import {compose} from 'redux';
import {createReducer, createAction} from 'redux-act';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import Actions from '../actions';

const LocalActions = {
  showDetails: createAction('Toggle which game details are visible')
}

const initialState = Map({
  data: Map(),
  visible: -1
});

const reducer = createReducer({
  [Actions.updateDisplay]: (state, {data}) => state.set('data', data),
  [LocalActions.showDetails]: (state, key) => state.set('visible', key)
}, initialState);

const mapStateToProps = state => state.get('results').toObject();

const mapDispatchToProps = (dispatch, props) => ({
  onClick: key => dispatch(LocalActions.showDetails(key))
});

export const connector = compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure
);

export default reducer;
