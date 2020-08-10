import styled, { keyframes } from 'styled-components';

const spin = keyframes`
to {
  transform: rotate(359deg);
}
`;

export const LoadingSpinner = styled.div`
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  height: 100px;
  width: 100px;
  border: 3px solid #fff;
  border-top-color: red;
  border-right-color: red;
  border-radius: 50%;
  animation: ${spin} 0.9s infinite linear;
  z-index: 10;
`;

export const LoadingText = styled.div`
  position: absolute;
  text-indent: -5px;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  height: 50px;
  width: 50px;
  font-size: 0.9rem;
  line-height: 50px;
`;
