import React from 'react';
import styled from 'styled-components';
import withAuth from '../hocs/withAuth';
import { notification, Button } from 'antd';
import axios from 'axios';

// css

const Background = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-350px, -250px);
  width: 700px;
  height: 500px;
  background-color: #fff;
  border-radius: 50px;

  h1 {
    margin-top: 70px;
    margin-bottom: 0;
    text-align: center;
    font-size: 2rem;
  }

  form {
    padding: 20px 100px 0px 100px;
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
  }

  .container_password {
    margin-top: 20px;
  }

  label {
    position: absolute;
    top: 0;
    color: #495057;
  }

  input {
    box-sizing: border-box;
    outline: none;
    margin-top: 25px;
    border: none;
    border-bottom: 1px solid #ced4da;
    width: 100%;
    height: 30px;
    font-size: 1.3rem;

    &.active {
      border-bottom: 1px solid;
    }
  }

  p {
    margin: 50px 0 0 0;
    text-align: center;
  }

  button {
    border-radius: 10px;
    width: 100%;
    margin-top: 10px;
    font-size: 1.3rem;
    height: calc(1.3rem + 30px);
  }
`;

// component
class Signin extends React.Component {
  state = {
    email: '',
    password: '',
    logState: false,
  };

  a = React.createRef();

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  };

  focus = ({ target }) => {
    target.classList.toggle('active');
  };

  notify = (content, type) => {
    notification[type]({
      message: content,
    });
  };

  signIn = async ({ keyCode }) => {
    if (keyCode !== 13 && keyCode !== undefined) return;

    const { email, password } = this.state;

    if (email.trim() === '')
      return this.notify('please input your email', 'warning');
    else if (password === '')
      return this.notify('please input your password', 'warning');

    try {
      const response = await axios.post('https://api.marktube.tv/v1/me', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      this.setState({
        logState: true,
      });

      setTimeout(() => {
        this.props.history.push('/');
      }, 1500);
    } catch (err) {
      const errCode = err?.response?.data?.error;

      if (errCode === 'USER_NOT_EXIST') {
        this.notify('user not exist', 'error');
      } else if (errCode === 'PASSWORD_NOT_MATCH') {
        this.notify('password not match', 'error');
      } else {
        this.notify(`unknown Error: ${errCode}`, 'error');
      }
    }
  };

  render() {
    return (
      <Background>
        <Wrapper>
          <h1>My books</h1>
          <form>
            <fieldset>
              <legend>로그인</legend>
              <div className="container_email">
                <label htmlFor="email">Email </label>
                <input
                  id="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                  onFocus={this.focus}
                  onBlur={this.focus}
                />
              </div>
              <div className="container_password">
                <label htmlFor="password">Password </label>
                <input
                  id="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  onKeyUp={this.signIn}
                  onFocus={this.focus}
                  onBlur={this.focus}
                />
              </div>
              <p>당신이 읽은 책을 조회하고 싶다면? Click! ↓</p>
              <Button
                type="primary"
                loading={this.state.logState}
                onClick={this.signIn}
              >
                Sign in
              </Button>
            </fieldset>
          </form>
        </Wrapper>
      </Background>
    );
  }
}

export default withAuth(Signin, false);
