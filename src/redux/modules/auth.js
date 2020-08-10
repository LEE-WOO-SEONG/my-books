import userService from '../../services/userService';
import tokenService from '../../services/tokenService';
import { push } from 'connected-react-router';
import {
  put,
  call,
  delay,
  select,
  takeLeading,
  takeEvery,
} from 'redux-saga/effects';
import { createActions, handleActions } from 'redux-actions';

const option = {
  prefix: 'my-books/auth',
};

// action + action creator
export const { start, success, fail, logstate, initerror } = createActions(
  {
    SUCCESS: token => ({ token }),
  },
  'START',
  'FAIL',
  'LOGSTATE',
  'INITERROR',
  option
);

// thunk function
// export function signinThunk(email, password) {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(start());
//       const token = await userService.signin(email, password);
//       tokenService.save(token);
//       dispatch(success(token));
//       dispatch(push('/'));
//     } catch (err) {
//       const errCode = err?.response?.data?.error;
//       dispatch(fail(errCode));
//     }
//   };
// }

// saga function
function* signinSaga(action) {
  const { email, password } = action.payload;

  try {
    yield put(start());
    yield delay(1000);
    const token = yield call(userService.signin, email, password);
    tokenService.save(token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error) {
    const errCode = error.response.data.error;
    yield put(fail(errCode));
    yield delay(1000);
    yield put(initerror());
  }
}

function* signoutSaga() {
  const token = yield select(state => state.auth.token);

  yield put(start());
  yield delay(500);
  yield call(userService.signout, token);
  tokenService.remove();
  yield put(success(null));
  yield put(push('/signin'));
}

// saga action
const START_SIGNIN_SAGA = 'START_SIGN_SAGA';
const START_SIGNOUT_SAGA = 'START_SIGNOUT_SAGA';

// saga action creator
export const startSigninSaga = (email, password) => ({
  type: START_SIGNIN_SAGA,
  payload: {
    email,
    password,
  },
});

export const startSignoutSaga = () => ({
  type: START_SIGNOUT_SAGA,
});

// saga 함수를 등록하는 saga
export function* authSaga() {
  yield takeEvery(START_SIGNIN_SAGA, signinSaga);
  yield takeLeading(START_SIGNOUT_SAGA, signoutSaga);
}

// initialstate.
const initialState = {
  token: null,
  keepLogin: false,
  loading: false,
  error: null,
};

// action handler
const reducer = handleActions(
  {
    START: state => ({
      token: state.token,
      keepLogin: state.keepLogin,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      token: action.payload.token,
      keepLogin: state.keepLogin,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      token: null,
      keepLogin: state.keepLogin,
      loading: false,
      error: action.payload,
    }),
    LOGSTATE: (state, action) => ({
      token: null,
      keepLogin: !state.keepLogin,
      loading: false,
      error: state.error,
    }),
    INITERROR: state => ({
      ...state,
      error: null,
    }),
  },
  initialState,
  option
);

export default reducer;
