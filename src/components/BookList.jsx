import React from 'react';
import BookListHeader from './BookListHeader';
import BookListBody from './BookListBody';

function BookList({ loading, books, error, getBooks }) {
  return (
    <>
      <BookListHeader books={books} getBooks={getBooks} />
      <BookListBody
        loading={loading}
        books={books}
        error={error}
        getBooks={getBooks}
      />
    </>
  );
}

export default BookList;
