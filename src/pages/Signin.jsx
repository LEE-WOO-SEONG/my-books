import React from 'react';
import styled from 'styled-components';
import withAuth from '../hocs/withAuth';
import { Button } from 'antd';
import axios from 'axios';
import { FcLock, FcUnlock } from 'react-icons/fc';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import LoginContext from '../contexts/LoginContext';

// css

const Wrapper = styled.section`
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
    margin-bottom: 70px;

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

  /* .keepState_checkbox {
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
    } */
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

// component
class Signin extends React.Component {
  state = {
    password: '',
    visiblePw: false,
    isLogin: null,
  };

  email = React.createRef(null);

  static contextType = LoginContext;

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  };

  validateInfo = () => {
    const email = this.email.current.value;
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!email.trim()) return '이메일을 입력해 주세요';

    if (!regExp.test(email)) {
      return '잘못된 이메일 형식 입니다. ex) 1234@abcd.efg';
    } else {
      return '이메일 및 비밀번호를 다시 입력 해 주세요.';
    }
  };

  typeChange = () => {
    this.setState({
      visiblePw: !this.state.visiblePw,
    });
  };

  signIn = async ({ keyCode }) => {
    if (keyCode !== 13 && keyCode !== undefined) return;

    const { password } = this.state;

    try {
      const response = await axios.post('https://api.marktube.tv/v1/me', {
        email: this.email.current.value,
        password,
      });

      // const logState = this.context.keepLogin;
      // if (logState) {
      // localStorage.setItem('logState', logState);
      // }

      const token = response.data.token;
      localStorage.setItem('token', token);
      this.props.history.push('/');
    } catch (err) {
      this.setState({
        isLogin: false,
      });

      setTimeout(() => {
        this.setState({
          isLogin: null,
        });
      }, 1500);

      const errCode = err?.response?.data?.error;

      if (errCode === 'USER_NOT_EXIST') {
        console.log('USER_NOT_EXIST');
      } else if (errCode === 'PASSWORD_NOT_MATCH') {
        console.log('PASSWORD_NOT_MATCH');
      } else {
        console.log(`UNKNOWN Error: ${err}`);
      }
    }
  };

  render() {
    return (
      <Wrapper>
        <h1>My books</h1>
        <form>
          <fieldset>
            <legend>로그인</legend>
            <div className="container_email">
              <label htmlFor="email">Email</label>
              <input id="email" type="text" ref={this.email} />
            </div>
            <div className="container_password">
              <label htmlFor="password">Password </label>
              <input
                id="password"
                type={this.state.visiblePw ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange}
                onKeyUp={this.signIn}
              />
              <button
                className="password_btn"
                type="button"
                aria-label="비밀번호 보기"
                onClick={this.typeChange}
              >
                {this.state.visiblePw ? <FcUnlock /> : <FcLock />}
              </button>
            </div>
            {/* <div className="keepState_checkbox">
              <input
                id="checkbox"
                type="checkbox"
                onChange={this.context.changeLogstate}
              />
              <label htmlFor="checkbox">
                {this.context.keepLogin ? (
                  <MdCheckBox color="1890ff" />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
              </label>
              <span>로그인 상태 유지</span>
            </div> */}
            <p className="login_comment">
              <span>나만의 책 리스트를 만들고 싶다면?</span>
              <span>지금 당장 로그인 하세요!</span>
            </p>
            <Button type="primary" className="login_btn" onClick={this.signIn}>
              Sign in
            </Button>
            <p className="login_state">
              {this.state.isLogin === null ? '' : this.validateInfo()}
            </p>
          </fieldset>
        </form>
      </Wrapper>
    );
  }
}

export default withAuth(Signin, false);
