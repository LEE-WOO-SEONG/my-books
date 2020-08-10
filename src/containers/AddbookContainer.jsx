import React from 'react';
import { useDispatch } from 'react-redux';
import { addBookSaga } from '../redux/modules/book';

// component
import AddBook from '../components/AddBook';

function AddbookContainer() {
  const dispatch = useDispatch();

  const addBook = React.useCallback(
    (token, book) => {
      dispatch(addBookSaga(token, book));
    },
    [dispatch]
  );

  return <AddBook addBook={addBook} />;
}

export default AddbookContainer;
