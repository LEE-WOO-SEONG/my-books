import React from 'react';

// styledComponent
import { HomeStyle } from '../styles/HomeStyle';

// components
import withAuth from '../hocs/withAuth';
import BookListContainer from '../containers/BookListContainer';
import HomeHeader from '../components/HomeHeader';
import { useSelector } from 'react-redux';
import tokenService from '../services/tokenService';

function Home() {
  const keepLogin = useSelector(state => state.auth.keepLogin);

  React.useEffect(() => {
    window.addEventListener('beforeunload', function removeToken() {
      if (!keepLogin) {
        tokenService.remove();
      }

      window.removeEventListener('beforeunload', removeToken);
    });
  }, [keepLogin]);

  return (
    <HomeStyle>
      <header>
        <HomeHeader />
      </header>
      <main>
        <BookListContainer />
      </main>
    </HomeStyle>
  );
}

export default withAuth(Home, true);
