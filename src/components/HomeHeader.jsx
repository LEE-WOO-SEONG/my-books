import React from 'react';
import { useDispatch } from 'react-redux';

// antdesign component
import { Button } from 'antd';

// imgs
import logoImg from '../imgs/logo.png';
import { startSignoutSaga } from '../redux/modules/auth';

function HomeHeader() {
  const dispatch = useDispatch();

  return (
    <>
      <h1>
        <img src={logoImg} alt="" />
        My Books
      </h1>
      <Button type="primary" onClick={SignOut}>
        Sign out
      </Button>
    </>
  );

  // 원래 이 로직은 container에서 수행해야 한다..
  function SignOut() {
    dispatch(startSignoutSaga());
  }
}

export default HomeHeader;
