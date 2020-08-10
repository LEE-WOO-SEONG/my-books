import React from 'react';
import styled, { keyframes } from 'styled-components';

// style
const down = keyframes`
  to {
    transform: translateY(20px);
  }
`;

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);

  div {
    position: relative;
    margin: 0 auto;
    margin-top: 30vh;
    width: 30vw;
    height: 20vh;
    border-radius: 2px;
    padding: 30px;

    background-color: #fff;
    animation: 0.2s ${down} linear forwards;
  }

  p {
    font-weight: bold;
  }

  button {
    position: absolute;
    right: 52px;
    bottom: 20px;
    background-color: #4dabf7;
    outline: none;
    border: none;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #74c0fc;
    }
    &:active {
      background-color: #339af0;
    }

    & + button {
      right: 20px;
    }
  }
`;

export default function Modal({ setView, removeBook }) {
  return (
    <ModalDiv>
      <div>
        <p>선택하신 책을 정말로 삭제하시겠습니까?</p>
        <button onClick={Yes}>Yes</button>
        <button onClick={No}>No</button>
      </div>
    </ModalDiv>
  );

  function Yes() {
    setView(view => !view);
    removeBook();
  }

  function No() {
    setView(view => !view);
  }
}
