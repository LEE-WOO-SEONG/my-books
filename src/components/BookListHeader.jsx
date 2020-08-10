import React from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { search } from '../redux/modules/book';

function BookListHeader({ books }) {
  const searchInput = React.useRef('');
  const initialBooks = React.useRef([]);
  const dispatch = useDispatch();

  return (
    <section className="list_header">
      <h2>Book List</h2>
      <span>총: {books.length}권</span>
      <button className="btn_addBook" onClick={moveAddBook}>
        Add Book
      </button>
      <div className="search">
        <input
          type="text"
          ref={searchInput}
          onKeyUp={filterBooks}
          placeholder="Search book.."
        />
        <button className="btn_search" onClick={filterBooks}>
          <FiSearch />
        </button>
        <button className="btn_reset" onClick={initBooks}>
          <GrPowerReset />
        </button>
      </div>
    </section>
  );

  function moveAddBook() {
    dispatch(push('/add'));
  }

  function initBooks() {
    if (initialBooks.current.length === 0) return;
    dispatch(search(initialBooks.current));
  }

  function filterBooks({ keyCode }) {
    if (searchInput.current.value.trim() === '') return;
    if (keyCode !== 13 && keyCode !== undefined) return;
    if (initialBooks.current.length === 0) {
      initialBooks.current = books;
    }

    const newBooks = books.filter(({ title, author }) => {
      const bookTitle = title.split(' ').join('').toLowerCase();
      const bookAuthor = author.split(' ').join('').toLowerCase();

      const resultTitle = bookTitle.includes(
        searchInput.current.value.trim().toLowerCase()
      );
      const resultAuthor = bookAuthor.includes(
        searchInput.current.value.trim().toLowerCase()
      );

      return resultTitle || resultAuthor;
    });

    dispatch(search(newBooks));
    searchInput.current.value = '';
  }
}

export default BookListHeader;
