import styled from 'styled-components';

export const AddBookSection = styled.section`
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: 60%;
  padding: 50px 0 50px 50px;

  div {
    width: 100%;
    margin-top: 10px;
  }

  label {
    display: block;
  }

  input {
    margin-top: 10px;
    padding: 5px 10px;
    outline: none;
    border: 1px solid #ced4da;
    width: 100%;
  }

  textarea {
    margin-top: 10px;
    padding: 5px 10px;
    outline: none;
    border: 1px solid #ced4da;
    width: 100%;
  }

  .back {
    position: absolute;
    top: 30px;
    right: 0;
    font-size: 1.5rem;
    color: #1971c2;
    cursor: pointer;

    &:hover {
      color: #228be6;
    }

    &:active {
      color: #1971c2;
    }
  }

  button {
    margin-top: 30px;
    outline: none;
    border: none;
    border-radius: 3px;
    color: #1c7ed6;
    padding: 7px 15px;
    color: #fff;
    background-color: #339af0;
    cursor: pointer;

    &:hover {
      background-color: #228be6;
    }

    &:active {
      background-color: #1971c2;
    }
  }
`;
