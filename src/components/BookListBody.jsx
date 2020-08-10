import React from 'react';
import { NothingDiv } from '../styles/HomeStyle';

function BookListBody({ loading, books, error, getBooks }) {
  React.useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <section className="list_container">
      {loading && <NothingDiv>로딩 중입니다..</NothingDiv>}
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
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BookListBody;
