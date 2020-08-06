import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BookListThunk } from '../actions/bookActions';

// components
import BookList from '../components/BookList';

function BookListContainer() {
  const books = useSelector(state => state.book.books);
  const loading = useSelector(state => state.book.loading);
  const error = useSelector(state => state.book.error);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const getBooks = React.useCallback(() => {
    dispatch(BookListThunk(token));
  }, [dispatch, token]);

  return (
    <BookList
      loading={loading}
      books={books}
      error={error}
      getBooks={getBooks}
    />
  );
}

export default BookListContainer;
