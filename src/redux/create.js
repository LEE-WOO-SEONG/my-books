import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducer from './modules/reducer';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootSaga from './modules/saga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export default function create(token) {
  let keepLogin = false;
  if (token) keepLogin = true;

  const store = createStore(
    reducer(history),
    {
      auth: {
        token,
        keepLogin,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(
      applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware)
    )
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
