import React from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { searchBooks } from '../actions/bookActions';

function BookListHeader({ books, getBooks }) {
  const searchInput = React.useRef('');
  const dispatch = useDispatch();

  return (
    <section className="list_header">
      <h2>Book List</h2>
      <span>총: {books.length}권</span>
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
        <button className="btn_reset" onClick={getBooks}>
          <GrPowerReset />
        </button>
      </div>
    </section>
  );

  function filterBooks({ keyCode }) {
    if (keyCode !== 13 && keyCode !== undefined) return;

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

    dispatch(searchBooks(newBooks));

    searchInput.current.value = '';
  }
}

export default BookListHeader;
