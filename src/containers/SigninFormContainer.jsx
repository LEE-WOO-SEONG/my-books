import React from 'react';
import SigninForm from '../components/SigninForm';
// import { signinThunk } from '../redux/modules/auth';
import { startSigninSaga } from '../redux/modules/auth';
import { useDispatch, useSelector } from 'react-redux';

export default function SigninFormContainer() {
  const { loading, keepLogin, error } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const signin = React.useCallback(
    (email, password) => {
      // dispatch(signinThunk(email, password));
      dispatch(startSigninSaga(email, password));
    },
    [dispatch]
  );

  return (
    <SigninForm
      loading={loading}
      keepLogin={keepLogin}
      error={error}
      signin={signin}
    />
  );
}
