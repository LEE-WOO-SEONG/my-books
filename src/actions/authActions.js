import userService from '../services/userService';
import tokenService from '../services/tokenService';
import logStateService from '../services/logStateService';

export const START_SIGNIN = 'START_SIGNIN';
export const SUCCESS_SIGNIN = 'SUCCESS_SIGNIN';
export const FAIL_SIGNIN = 'FAIL_SIGNIN';
export const SET_KEEPLOGIN = 'SET_KEEPLOGIN';
export const SIGNOUT = 'SIGNOUT';

export function startSignin() {
  return {
    type: START_SIGNIN,
  };
}

export function successSignin(token) {
  return {
    type: SUCCESS_SIGNIN,
    token,
  };
}

export function failSignin(error) {
  return {
    type: FAIL_SIGNIN,
    error,
  };
}

export function setKeepLogin() {
  return {
    type: SET_KEEPLOGIN,
  };
}

export function signOut() {
  return {
    type: SIGNOUT,
  };
}

export function signinThunk(email, password, history, keepLogin) {
  return async (dispatch, getState) => {
    try {
      dispatch(startSignin());
      const token = await userService.signin(email, password);
      dispatch(successSignin(token));
      tokenService.save(token);
      logStateService.save(keepLogin);
      history.push('/');
    } catch (err) {
      const errCode = err?.response?.data?.error;
      dispatch(failSignin(errCode));
    }
  };
}
