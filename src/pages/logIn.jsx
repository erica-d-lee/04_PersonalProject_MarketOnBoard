import React, { useState } from 'react';
import styled from 'styled-components';
import { BackGround, Window, Text, Header } from '../elements';
import keyhole from '../keyhole.png';
import { actionCreators as userActions } from '../redux/modules/user';
import { useDispatch } from 'react-redux';

const LogIn = (props) => {
  const dispatch = useDispatch();
  const [userid, setId] = useState('');
  const [password, setPw] = useState('');

  const changeId = (e) => {
    setId(e.target.value);
  };

  const changePw = (e) => {
    setPw(e.target.value);
  };

  const login = () => {
    if (userid === '' || password === '') {
      window.alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    dispatch(userActions.loginFB(userid, password));
  };

  return (
    <BackGround>
      <Window padding='0 0 0 10px'>
        <Header />
        <Title>
          <Text fontSize='x-large' fontWeight='bold'>
            탑승권이 있으신가요?
          </Text>
        </Title>
        <InputBox>
          <Inputs>
            <InputID
              type='text'
              value={userid}
              onChange={changeId}
              placeholder='아이디를 입력하세요'
            ></InputID>
            <InputPW
              type='password'
              value={password}
              onChange={changePw}
              placeholder='비밀번호를 입력하세요'
            ></InputPW>
            <ToSignUp
              onClick={() => {
                props.history.push('/signup');
              }}
            >
              없다면, 발급하러 가기 &gt;&gt;
            </ToSignUp>
          </Inputs>
          <BtnBox>
            <Button
              onClick={() => {
                login();
              }}
            >
              <img src={keyhole} alt={'로그인 버튼'} />
            </Button>
          </BtnBox>
        </InputBox>
      </Window>
    </BackGround>
  );
};

const Title = styled.div`
  padding: 20px 0 0 40px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px 20px 40px;
`;

const InputID = styled.input`
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid #a2ccdddf;
  &::placeholder {
    color: #65a3bb5e;
  }
  outline: none;
  &:focus {
    color: #4aa2c5e0;
  }
  caret-color: #4aa2c5ae;
`;

const InputPW = styled.input`
  margin-top: 10px;
  border: none;
  border-bottom: 2px solid #a2ccdddf;
  &::placeholder {
    color: #65a3bb5e;
  }
  outline: none;
  &:focus {
    color: #4aa2c5e0;
  }
  caret-color: #4aa2c5ae;
`;

const ToSignUp = styled.span`
  margin: 30px 0 0 3px;
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 0.05rem;
  color: #4aa2c5b5;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const BtnBox = styled.div`
  display: block;
  padding: 50px 20px 20px 10px;
`;

const Button = styled.button`
  font-size: 0.8rem;
  color: #f6fcff;
  width: 80px;
  height: 80px;
  margin: 0 30px 0 30px;
  border-radius: 40px;
  background-color: #41b4e2e1;
  border: 3px double white;
  outline: none;
  &:hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border: 3px double #aaa;
    opacity: 0.8;
  }
  padding: 0px;
  & > img {
    height: 35px;
  }
`;

export default LogIn;
