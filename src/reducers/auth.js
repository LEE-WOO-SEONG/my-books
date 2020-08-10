import {
  START_SIGNIN,
  SUCCESS_SIGNIN,
  FAIL_SIGNIN,
  SET_KEEPLOGIN,
  SIGNOUT,
} from '../actions/authActions';

const initialState = {
  token: null,
  keepLogin: false,
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case START_SIGNIN:
      return {
        token: null,
        keepLogin: state.keepLogin,
        loading: true,
        error: null,
      };
    case SUCCESS_SIGNIN:
      return {
        token: action.token,
        keepLogin: state.keepLogin,
        loading: false,
        error: null,
      };
    case FAIL_SIGNIN:
      return {
        token: null,
        keepLogin: state.keepLogin,
        loading: false,
        error: action.error,
      };
    case SET_KEEPLOGIN:
      return {
        token: null,
        keepLogin: !state.keepLogin,
        loading: false,
        error: null,
      };
    case SIGNOUT:
      return {
        token: null,
        keepLogin: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
