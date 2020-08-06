import bookService from '../services/bookService';

// action type name.
export const START_BOOKS_REQUEST = 'START_BOOKS_REQUEST';
export const SUCCESS_BOOKS_REQUEST = 'SUCCESS_BOOKS_REQUEST';
export const FAIL_BOOKS_REQUEST = 'FAIL_BOOKS_REQUEST';
export const SEARCH_BOOKS = 'SEARCH_BOOKS';

// action constructor.
export function startBooksRequest() {
  return {
    type: START_BOOKS_REQUEST,
  };
}

export function successBooksRequest(books) {
  return {
    type: SUCCESS_BOOKS_REQUEST,
    books,
  };
}

export function failBooksRequest(error) {
  return {
    type: FAIL_BOOKS_REQUEST,
    error,
  };
}

export function searchBooks(books) {
  return {
    type: SEARCH_BOOKS,
    books,
  };
}

// thunk
export function BookListThunk(token) {
  return async (dispatch, getState) => {
    try {
      dispatch(startBooksRequest());
      const bookList = await bookService.getBooks(token);
      dispatch(successBooksRequest(bookList));
    } catch (error) {
      console.error(error);
      dispatch(failBooksRequest(error));
    }
  };
}
