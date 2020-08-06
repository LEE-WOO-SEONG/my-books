import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import tokenService from '../services/tokenService';
import logStateService from '../services/logStateService';
import { signOut } from '../actions/authActions';

// antdesign component
import { Button } from 'antd';

// imgs
import logoImg from '../imgs/logo.png';

function HomeHeader() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <h1>
        <img src={logoImg} alt="" />
        My Books
      </h1>
      <Button type="primary" onClick={doSignOut}>
        Sign out
      </Button>
    </>
  );

  function doSignOut() {
    tokenService.remove();
    logStateService.remove();
    dispatch(signOut());
    history.push('/signin');
  }
}

export default HomeHeader;
