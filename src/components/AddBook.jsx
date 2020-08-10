import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';

// styles
import { AddBookSection } from '../styles/AddBookStyle';
import { IoMdArrowRoundBack } from 'react-icons/io';

function AddBookBody({ addBook }) {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [book, setBook] = React.useState({
    title: '',
    message: '',
    author: '',
    url: '',
  });

  return (
    <AddBookSection>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" value={book.title} onChange={change} />
      </div>
      <div>
        <label htmlFor="message">Comment</label>
        <textarea id="message" value={book.message} onChange={change} />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input id="author" type="text" value={book.author} onChange={change} />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input id="url" type="text" value={book.url} onChange={change} />
      </div>
      <button onClick={add}>Add</button>
      <IoMdArrowRoundBack className="back" onClick={back} />
    </AddBookSection>
  );

  function add() {
    addBook(token, book);
  }

  function change({ target }) {
    setBook({
      ...book,
      [target.id]: target.value,
    });
  }

  function back() {
    dispatch(push('/'));
  }
}

export default AddBookBody;
