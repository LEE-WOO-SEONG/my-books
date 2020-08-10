import { all } from 'redux-saga/effects';
import { booksSaga } from './book';
import { authSaga } from './auth';

// saga 들을 합친 rootsaga.
export default function* rootSaga() {
  yield all([booksSaga(), authSaga()]);
}
