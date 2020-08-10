import React from 'react';

// css
import { NothingDiv } from '../styles/HomeStyle';
import { LoadingSpinner, LoadingText } from '../styles/Loading';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import Modal from './Modal';

function BookListBody({ loading, books, error, getBooks, deleteBook }) {
  const [view, setView] = React.useState(false);
  const selectRef = React.useRef(0);
  console.log(selectRef);

  React.useEffect(() => {
    getBooks();
  }, [getBooks]);

  const removeBook = React.useCallback(() => {
    const bookId = Number(selectRef.current);
    deleteBook(bookId);
  }, [deleteBook]);

  return (
    <section className="list_container">
      {loading && books.length === 0 ? (
        <NothingDiv>
          <LoadingSpinner />
          <LoadingText>Loading...</LoadingText>
        </NothingDiv>
      ) : (
        ''
      )}
      {!error && books.length === 0 ? (
        <NothingDiv>검색하신 책을 찾을 수 없습니다.</NothingDiv>
      ) : (
        ''
      )}
      {error && <NothingDiv>책을 로딩하는데 실패하였습니다.</NothingDiv>}
      <ul>
        {books.map(({ bookId, title, author, message, url }) => (
          <li key={bookId}>
            <figure>
              <img src={url} alt={title} />
            </figure>
            <dl>
              <dt>Title</dt>
              <dd>{title}</dd>
              <dt>Author</dt>
              <dd>{author}</dd>
              <dt>Description</dt>
              <dd>{message}</dd>
            </dl>
            <FaEdit className="btn_editBook" />
            <RiDeleteBack2Line
              id={bookId}
              className="btn_removeBook"
              onClick={removeConfirm}
            />
          </li>
        ))}
      </ul>
      {view && <Modal setView={setView} removeBook={removeBook} />}
    </section>
  );

  function removeConfirm({ target }) {
    selectRef.current = target.id;
    console.log(target.id);
    setView(view => !view);
  }
}

export default BookListBody;
