import React from 'react';

// styledComponent
import { HomeStyle } from '../styles/HomeStyle';

// components
import withAuth from '../hocs/withAuth';
import BookListContainer from '../containers/BookListContainer';
import HomeHeader from '../components/HomeHeader';

function Home() {
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
