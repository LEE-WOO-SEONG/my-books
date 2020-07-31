import React, { useState } from 'react';
import { Button } from 'antd';
import withAuth from '../hocs/withAuth';

function Home({ history }) {
  const [logState, setLogState] = useState(false);

  return (
    <div>
      <h1>My books Homepage 입니다.</h1>
      <Button type="primary" loading={logState} onClick={signOut}>
        Sign out
      </Button>
    </div>
  );

  function signOut() {
    localStorage.removeItem('token');
    setLogState(!logState);

    setTimeout(() => {
      history.push('/signin');
    }, 1500);
  }
}

export default withAuth(Home, true);
