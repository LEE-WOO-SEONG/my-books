import styled from 'styled-components';

export const HomeStyle = styled.div`
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
    min-height: 70vh;

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
        position: relative;

        input {
          padding: 5px 50px 5px 5px;
          border: 1px solid;
          border-radius: 5px;
          outline: none;
          font-size: 1.1rem;
          color: #000;
          width: 250px;
        }

        button {
          background-color: transparent;
          outline: none;
          width: 40px;
          height: 40px;
          padding: 0;
          font-size: 2rem;

          cursor: pointer;
        }

        .btn_search {
          border: none;
          position: absolute;
          right: 40px;
          color: #1864ab;
          transition: transform 0.3s;

          &:active {
            transform: scale(0.8);
          }
        }

        .btn_reset {
          vertical-align: bottom;
          border: 1px solid;
          border-radius: 5px;

          &:hover {
            background-color: #f1f3f5;
          }

          &:active {
            background-color: #ced4da;
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

        figure {
          float: left;
          margin-bottom: 0;
          width: 250px;
          height: 270px;
          border: 1px solid #ced4da;

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

export const NothingDiv = styled.div`
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 100px;
  font-size: 2rem;
`;
