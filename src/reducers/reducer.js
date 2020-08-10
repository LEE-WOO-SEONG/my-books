import { combineReducers } from 'redux';
import book from './book';
import auth from './auth';

const reducer = combineReducers({
  book,
  auth,
});

export default reducer;
