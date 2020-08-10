import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { createGlobalStyle } from 'styled-components';
import tokenService from './services/tokenService';
import logStateService from './services/tokenService';

// pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import FatalError from './pages/FatalError';

// background img
import booksBg from './imgs/books_bg2.jpg';
import { useSelector } from 'react-redux';

// css
const GlobalStyle = createGlobalStyle`
body {
  background: #fff url(${booksBg}) no-repeat;
  background-size: cover;
}
`;

// component
function App() {
  const logState = useSelector(state => state.auth.keepLogin);

  if (!logState) {
    window.addEventListener('unload', () => {
      tokenService.remove();
      logStateService.remove();
    });
  }

  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
