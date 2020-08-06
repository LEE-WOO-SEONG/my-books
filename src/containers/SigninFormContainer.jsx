import React from 'react';
import SigninForm from '../components/SigninForm';
import { signinThunk } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function SigninFormContainer() {
  const keepLogin = useSelector(state => state.auth.keepLogin);
  const error = useSelector(state => state.auth.error);

  const dispatch = useDispatch();
  const history = useHistory();

  const signin = React.useCallback(
    (email, password) => {
      dispatch(signinThunk(email, password, history, keepLogin));
    },
    [dispatch, history, keepLogin]
  );

  return <SigninForm keepLogin={keepLogin} error={error} signin={signin} />;
}
