import React, {
  useState,
  useEffect,
  // useContext,
  useCallback,
  useRef,
} from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import withAuth from '../hocs/withAuth';
import axios from 'axios';
// import LoginContext from '../contexts/LoginContext';
import { GrPowerReset } from 'react-icons/gr';
import { FiSearch } from 'react-icons/fi';

// images
import logoImg from '../imgs/logo.png';

// style
const Wrapper = styled.div`
  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 10vh;
    padding: 0 200px;
    background: rgba(0, 0, 0, 0.4);
    z-index: 10;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      color: #fff;
      font-size: 4vh;
      margin: 0;

      img {
        width: auto;
        height: 10vh;
        margin-right: 10px;
      }
    }

    button {
      box-sizing: content-box;
      padding: 1vh 2vh;
      font-size: 2vh;
    }
  }

  main {
    position: absolute;
    top: 30vh;

    padding: 0 200px;
    width: 100%;
    background-color: rgba(255, 255, 255);

    .list_header {
      position: relative;
      margin-top: 10px;

      h2 {
        font-size: 2rem;
        margin-bottom: 0;
      }

      span {
        position: absolute;
        right: 0;
        bottom: 5px;
        font-size: 1.1rem;
      }

      .search {
        display: inline-block;

        input {
          padding: 5px 50px 5px 5px;
          border: 1px solid;
          outline: none;
          font-size: 1.1rem;
          color: #000;
          width: 250px;
        }

        button {
          background-color: transparent;
          border: none;
          outline: none;
          width: 40px;
          height: 40px;
          padding: 0;

          color: #1864ab;
          font-size: 2rem;
          vertical-align: bottom;

          cursor: pointer;
          transition: transform 0.3s;

          &:active {
            transform: scale(0.8);
          }
        }
      }
    }

    .list_container {
      ul {
        padding-left: 0;
      }

      li {
        list-style-type: none;
        height: 270px;
        overflow: auto;

        figure {
          float: left;
          margin-bottom: 0;
          width: 250px;
          height: 270px;
          border: 1px solid;

          img {
            width: 100%;
            max-height: 100%;
          }
        }

        dl {
          padding-left: 255px;
          margin-bottom: 0;
          height: 270px;
          border: 1px solid #ced4da;

          dt {
            font-weight: bold;
            font-size: 1.2rem;
            display: inline-block;
            border-bottom: 2px solid #91a7ff;

            &::before {
              content: '*';
              color: red;
            }
          }
        }
      }
    }
  }
`;

// component
function Home({ history, token }) {
  const [books, setBooks] = useState([]);
  const searchInput = useRef('');
  const initialBooks = useRef([]);
  // const loginContext = useContext(LoginContext);

  useEffect(() => {
    async function request() {
      try {
        const response = await axios.get('https://api.marktube.tv/v1/book', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const bookList = response.data;
        initialBooks.current = bookList;

        setBooks(bookList);
      } catch (err) {
        console.error(err);
      }
    }

    request();
  }, [token]);

  const signOut = useCallback(() => {
    // localStorage.removeItem('token');
    localStorage.removeItem('logState');
    history.push('/signin');
  }, [history]);

  const initBooks = () => {
    setBooks(initialBooks.current);
  };

  const filterBooks = useCallback(
    ({ keyCode }) => {
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

      setBooks(newBooks);

      searchInput.current.value = '';
    },
    [books]
  );

  return (
    <Wrapper>
      <header>
        <h1>
          <img src={logoImg} alt="" />
          My Books
        </h1>
        <Button type="primary" onClick={signOut}>
          Sign out
        </Button>
      </header>
      <main>
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
            <button onClick={filterBooks}>
              <FiSearch />
            </button>
            <button onClick={initBooks}>
              <GrPowerReset />
            </button>
          </div>
        </section>
        <section className="list_container">
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
      </main>
    </Wrapper>
  );
}

export default withAuth(Home, true);
