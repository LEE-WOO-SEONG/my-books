import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { createGlobalStyle } from 'styled-components';
import LoginContext from './contexts/LoginContext';

// pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import FatalError from './pages/FatalError';

// background img
import booksBg from './imgs/books_bg2.jpg';

const GlobalStyle = createGlobalStyle`
body {
  background: #fff url(${booksBg}) no-repeat;
  background-size: cover;
}
`;

function App() {
  const [keepLogin, setKeepLogin] = useState(false);

  // useEffect(() => {
  //   if (!localStorage.getItem('logState')) return;

  //   setKeepLogin(true);
  // }, []);

  const changeLogstate = () => setKeepLogin(!keepLogin);

  // const removeState = useCallback(() => {
  //   if (!keepLogin) {
  //     localStorage.removeItem('logState');
  //     localStorage.removeItem('token');
  //   }
  // }, [keepLogin]);

  // window.addEventListener('unload', removeState);

  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <GlobalStyle />
      <LoginContext.Provider
        value={{
          keepLogin,
          changeLogstate,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </LoginContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
