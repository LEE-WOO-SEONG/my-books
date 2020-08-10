import React from 'react';
import { FcLock, FcUnlock } from 'react-icons/fc';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { Button } from 'antd';
import { logstate } from '../redux/modules/auth';
import { useDispatch } from 'react-redux';

// style
import { LoadingSpinner } from '../styles/Loading';

const initialState = {
  visiblePw: false,
  comment: null,
  email: '',
  password: '',
};

const NOTEXIST_EMAIL = 'NOTEXIST_EMAIL';
const INCORRECT_EMAIL = 'INCORRECT_EMAIL';

export default function SigninForm({ loading, keepLogin, error, signin }) {
  const [state, setState] = React.useState(initialState);
  const dispatch = useDispatch();

  return (
    <>
      {loading && <LoadingSpinner />}
      <form>
        <fieldset>
          <legend>로그인</legend>
          <div className="container_email">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={state.email}
              onChange={inputChange}
            />
          </div>
          <div className="container_password">
            <label htmlFor="password">Password </label>
            <input
              id="password"
              type={state.visiblePw ? 'text' : 'password'}
              onChange={inputChange}
              onKeyUp={request}
            />
            <button
              className="password_btn"
              type="button"
              aria-label="비밀번호 보기"
              onClick={typeChange}
            >
              {state.visiblePw ? <FcUnlock /> : <FcLock />}
            </button>
          </div>
          <div className="keepState_checkbox">
            <input id="checkbox" type="checkbox" onChange={setLogState} />
            <label htmlFor="checkbox">
              {keepLogin ? (
                <MdCheckBox color="1890ff" />
              ) : (
                <MdCheckBoxOutlineBlank />
              )}
            </label>
            <span>로그인 상태 유지</span>
          </div>
          <p className="login_comment">
            <span>나만의 책 리스트를 만들고 싶다면?</span>
            <span>지금 당장 로그인 하세요!</span>
          </p>
          <Button type="primary" className="login_btn" onClick={request}>
            Sign in
          </Button>
          <p className="login_state">
            {state.comment === NOTEXIST_EMAIL && '이메일을 입력해 주세요'}
            {state.comment === INCORRECT_EMAIL &&
              '잘못된 이메일 형식 입니다. ex) 1234@abcd.efg'}
            {error === 'PASSWORD_NOT_MATCH' &&
              '이메일 및 비밀번호를 다시 입력 해 주세요.'}
          </p>
        </fieldset>
      </form>
    </>
  );

  function typeChange() {
    setState({
      ...state,
      visiblePw: !state.visiblePw,
    });
  }

  function inputChange({ target }) {
    setState({
      ...state,
      [target.id]: target.value,
    });
  }

  function setLogState() {
    dispatch(logstate());
  }

  function request({ keyCode }) {
    if (keyCode !== 13 && keyCode !== undefined) return;

    if (!validateInfo()) return;

    signin(state.email, state.password);
  }

  function validateInfo() {
    const { email } = state;
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (email.trim() === '') {
      commentChange(NOTEXIST_EMAIL);
      return false;
    }

    if (!regExp.test(email)) {
      commentChange(INCORRECT_EMAIL);
      return false;
    }

    return true;
  }

  function commentChange(comment) {
    setState(state => ({
      ...state,
      comment,
    }));

    setTimeout(() => {
      setState(state => ({
        ...state,
        comment: null,
      }));
    }, 2000);
  }
}
