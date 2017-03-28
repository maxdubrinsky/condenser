import {createAction} from 'redux-act';

const Actions = {
  search: createAction('Search for games'),
  updateDisplay: createAction('Updates the display with games')
};

export default Actions;