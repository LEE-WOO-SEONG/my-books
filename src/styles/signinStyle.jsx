import styled from 'styled-components';

const SigninWrapper = styled.section`
  position: fixed;
  top: 20vh;
  left: 50vw;
  transform: translateX(-300px);

  width: 600px;
  padding: 50px 100px 30px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);

  h1 {
    margin: 0;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
  }

  fieldset {
    box-sizing: border-box;
    border: none;
    margin-top: 50px;
    width: 100%;
  }

  legend {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }

  [class^='container'] {
    position: relative;

    label {
      position: absolute;
      top: 0;
    }

    input {
      box-sizing: border-box;
      outline: none;
      margin-top: 25px;
      padding: 8px 40px 8px 20px;
      border: none;
      width: 100%;
      font-size: 1.3rem;
      color: black;
    }
  }

  .container_password {
    margin-top: 10px;

    .password_btn {
      position: absolute;
      top: 25px;
      right: 0px;

      font-size: 30px;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
    }
  }

  .keepState_checkbox {
    margin-top: 10px;
    margin-bottom: 50px;

    input {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: polygon(0 0, 0 0, 0 0);
    }

    label {
      font-size: 1.5rem;
      vertical-align: middle;
      cursor: pointer;
    }

    span {
      font-size: 1.2rem;
    }
  }

  .login_comment {
    margin: 0;
    text-align: center;
    font-size: 1.01rem;

    span {
      display: block;
    }
  }

  .login_btn {
    width: 100%;
    margin-top: 20px;
    font-size: 1.3rem;
    height: calc(1.3rem + 30px);
  }

  .login_state {
    margin-top: 10px;
    margin-bottom: 0;
    height: 25px;
    font-size: 1.01rem;
    color: red;
    text-align: center;
  }
`;

export default SigninWrapper;
