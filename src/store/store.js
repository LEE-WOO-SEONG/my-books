import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducers/reducer';
import tokenService from '../services/tokenService';
import logStateService from '../services/logStateService';

export default function create() {
  return createStore(
    reducer,
    {
      auth: {
        token: tokenService.get(),
        keepLogin: JSON.parse(logStateService.get()),
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(applyMiddleware(thunk))
  );
}
