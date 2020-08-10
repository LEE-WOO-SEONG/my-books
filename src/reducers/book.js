import {
  START_BOOKS_REQUEST,
  SUCCESS_BOOKS_REQUEST,
  FAIL_BOOKS_REQUEST,
  SEARCH_BOOKS,
} from '../actions/bookActions';

const initialState = {
  books: [],
  loading: false,
  error: null,
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case START_BOOKS_REQUEST:
      return {
        books: [],
        loading: true,
        error: null,
      };
    case SUCCESS_BOOKS_REQUEST:
      return {
        books: action.books,
        loading: false,
        error: null,
      };
    case FAIL_BOOKS_REQUEST:
      return {
        books: [],
        loading: false,
        error: action.error,
      };
    case SEARCH_BOOKS:
      return {
        books: action.books,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
