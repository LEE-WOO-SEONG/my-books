import React from 'react';
import withAuth from '../hocs/withAuth';
import SigninWrapper from '../styles/SigninStyle';
import SigninFormContainer from '../containers/SigninFormContainer';

function Signin() {
  return (
    <SigninWrapper>
      <h1>My books</h1>
      <SigninFormContainer />
    </SigninWrapper>
  );
}

export default withAuth(Signin, false);
