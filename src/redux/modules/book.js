import bookService from '../../services/bookService';
import { put, call, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { createActions, handleActions } from 'redux-actions';
import { push } from 'connected-react-router';

const option = {
  prefix: 'my-books/books',
};

// action + action creator
export const {
  start,
  success,
  fail,
  search,
  add,
  edit,
  remove,
} = createActions(
  {
    SUCCESS: books => ({ books }),
    SEARCH: books => ({ books }),
    ADD: book => ({ book }),
    EDIT: book => ({ book }),
    REMOVE: bookId => ({ bookId }),
  },
  'FAIL',
  'START',
  option
);

// thunk function
// export function BookListThunk(token) {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(start());
//       await sleep(2000);
//       const bookList = await bookService.getBooks(token);
//       dispatch(success(bookList));
//     } catch (error) {
//       console.error(error);
//       dispatch(fail(error));
//     }
//   };
// }

// saga function

function* getBooksSaga() {
  const { token } = yield select(state => state.auth);
  try {
    yield put(start());
    // yield delay(2000);
    const bookList = yield call(bookService.getBooks, token);
    yield put(success(bookList));
  } catch (error) {
    yield put(fail(error));
  }
}

function* addBooksSaga(action) {
  try {
    const { token } = yield select(state => state.auth);
    const book = action.payload.book;
    yield call(bookService.addBook, token, book);
    yield put(add(book));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* editBooksSaga(action) {
  try {
    const { token } = yield select(state => state.auth);
    const book = action.payload.book;
    const editBook = yield call(bookService.editBook, token, book);
    yield put(edit(editBook));
  } catch (error) {
    yield put(fail(error));
  }
}

function* removeBooksSaga(action) {
  try {
    const { token } = yield select(state => state.auth);
    const bookId = Number(action.payload.bookId);
    yield call(bookService.deleteBook, token, bookId);
    yield put(remove(bookId));
  } catch (error) {
    yield put(fail(error));
  }
}

// getBooksSaga를 시작하는 action type.
const START_BOOKS_SAGA = 'START_BOOKS_SAGA';
const ADD_BOOK_SAGA = 'ADD_BOOK_SAGA';
const EDIT_BOOK_SAGA = 'EDIT_BOOK_SAGA';
const REMOVE_BOOK_SAGA = 'REMOVE_BOOK_SAGA';

// getBooksSaga를 시작하는 action creator.
export const startBooksSaga = token => ({
  type: START_BOOKS_SAGA,
  payload: {
    token,
  },
});

export const addBookSaga = (token, { title, message, author, url }) => ({
  type: ADD_BOOK_SAGA,
  payload: {
    book: {
      title,
      author,
      message,
      ownerID: token,
      url,
    },
  },
});

export const editBookSaga = bookId => ({
  type: EDIT_BOOK_SAGA,
  payload: {
    bookId,
  },
});

export const removeBookSaga = bookId => ({
  type: REMOVE_BOOK_SAGA,
  payload: {
    bookId,
  },
});

// saga 함수를 등록하는 saga
export function* booksSaga() {
  yield takeLatest(START_BOOKS_SAGA, getBooksSaga);
  yield takeEvery(ADD_BOOK_SAGA, addBooksSaga);
  yield takeEvery(EDIT_BOOK_SAGA, bookId => editBooksSaga(bookId));
  yield takeEvery(REMOVE_BOOK_SAGA, removeBooksSaga);
}

// initialstate.
const initialState = {
  books: [],
  loading: false,
  error: null,
};

// handler
const reducer = handleActions(
  {
    START: () => ({
      books: [],
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      books: action.payload.books,
      loading: false,
      error: null,
    }),
    ADD: (state, action) => ({
      books: [...state.books, action.payload.book],
      loading: false,
      error: null,
    }),
    EDIT: (state, action) => ({
      books: [...state.books, action.payload.book],
      loading: false,
      error: null,
    }),
    REMOVE: (state, action) => ({
      books: state.books.filter(book => book.bookId !== action.payload.bookId),
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      books: [],
      loading: false,
      error: action.payload,
    }),
    SEARCH: (state, action) => ({
      books: action.payload.books,
      loading: false,
      error: null,
    }),
  },
  initialState,
  option
);

export default reducer;
