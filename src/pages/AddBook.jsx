import React from 'react';

// components
import HomeHeader from '../components/HomeHeader';
import AddBookContainer from '../containers/AddbookContainer';

// style
import { HomeStyle } from '../styles/HomeStyle';

function AddBook() {
  return (
    <HomeStyle>
      <header>
        <HomeHeader />
      </header>
      <main>
        <AddBookContainer />
      </main>
    </HomeStyle>
  );
}

export default AddBook;
