import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { createGlobalStyle } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/create';

// pages
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import FatalError from './pages/FatalError';

// background img
import booksBg from './imgs/books_bg2.jpg';

// css
const GlobalStyle = createGlobalStyle`
body {
  background: #fff url(${booksBg}) no-repeat;
  background-size: cover;
}
`;

// component
function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <GlobalStyle />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/add" component={AddBook} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  );
}

export default App;
