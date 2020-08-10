import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import book from './book';
import auth from './auth';

const reducer = history =>
  combineReducers({
    book,
    auth,
    router: connectRouter(history),
  });

export default reducer;
