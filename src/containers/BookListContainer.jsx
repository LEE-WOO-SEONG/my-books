import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { BookListThunk } from '../redux/modules/book';
import {
  startBooksSaga,
  editBookSaga,
  removeBookSaga,
} from '../redux/modules/book';

// components
import BookList from '../components/BookList';

function BookListContainer() {
  const { books, loading, error, token } = useSelector(state => state.book);
  const dispatch = useDispatch();

  const getBooks = React.useCallback(() => {
    // dispatch(BookListThunk(token));
    dispatch(startBooksSaga(token));
  }, [dispatch, token]);

  const editBook = React.useCallback(
    book => {
      dispatch(editBookSaga(book));
    },
    [dispatch]
  );

  const deleteBook = React.useCallback(
    bookId => {
      dispatch(removeBookSaga(bookId));
    },
    [dispatch]
  );

  return (
    <BookList
      loading={loading}
      books={books}
      error={error}
      getBooks={getBooks}
      editBook={editBook}
      deleteBook={deleteBook}
    />
  );
}

export default BookListContainer;
