import React from 'react';
import BookListHeader from './BookListHeader';
import BookListBody from './BookListBody';

function BookList({
  loading,
  books,
  error,
  getBooks,
  addBook,
  editBook,
  deleteBook,
}) {
  return (
    <>
      <BookListHeader books={books} />
      <BookListBody
        loading={loading}
        books={books}
        error={error}
        getBooks={getBooks}
        addBook={addBook}
        editBook={editBook}
        deleteBook={deleteBook}
      />
    </>
  );
}

export default BookList;
