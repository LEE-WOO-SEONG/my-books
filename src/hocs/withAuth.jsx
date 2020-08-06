import React from 'react';
import { Redirect } from 'react-router-dom';

function withAuth(Component, hasToken) {
  const displayName = `withAuth(${Component.displayName || Component.name})`;

  const C = props => {
    const token = localStorage.getItem('token');

    // 1. 토큰: null + hasToken: true => signin Redirect..
    // 2. 토큰: null + hasToken: false => 전달 컴포넌트.
    // 3. 토큰이 있고 + hasToken: true => 전달 컴포넌트.
    // 3. 토큰이 있고 + hasToken: false => home Redirect..
    if (token === null && hasToken) {
      return <Redirect to="/signin" />;
    }

    if (token !== null && !hasToken) {
      return <Redirect to="/" />;
    }

    return <Component {...props} token={token} />;
  };

  C.displayName = displayName;
  return C;
}

export default withAuth;

// hoc
// 1. withRouter => new component
// withRouter(component)

// 2. connect(설정) => function
// connect(설정)(component) => new component

// 3. createFragmentContainer
// createFragmentContainer(component, 설정) => new component
