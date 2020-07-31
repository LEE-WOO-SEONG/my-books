import React from 'react';
import { Redirect } from 'react-router-dom';

function withAuth(Component, hasToken) {
  const displayName = `withAuth(${Component.displayName || Component.name})`;

  const C = props => {
    const token = localStorage.getItem('token');

    if (token === null && hasToken) {
      return <Redirect to="/signin" />;
    }

    if (token !== null && !hasToken) {
      return <Redirect to="/" />;
    }

    return <Component {...props} />;
  };

  C.displayName = displayName;
  return C;
}

export default withAuth;
