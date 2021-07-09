import React, { useState } from 'react';
import styled from 'styled-components';
import { BackGround, Window, Text, Header } from '../elements';
import ticket from '../ticket.png';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const SignUp = (props) => {
  const dispatch = useDispatch();

  const [userid, setId] = useState('');
  const [password, setPw] = useState('');
  const [pw_check, setPwCheck] = useState('');
  const [username, setUserName] = useState('');

  const signup = () => {
    if (userid === '' || password === '' || username === '') {
      window.alert('아이디, 닉네임, 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (password !== pw_check) {
      window.alert('비밀번호를 다시 한번 확인해주세요.');
      return;
    }

    dispatch(userActions.signupFB(userid, password, username));
  };

  return (
    <BackGround>
      <Window padding='0 0 0 10px'>
        <Header />
        <Title>
          <Text fontSize='x-large' fontWeight='bold'>
            탑승권 발급하기
          </Text>
        </Title>
        <InputBox>
          <Inputs>
            <Text fontSize='xx-small' color='#65a3bb5e'>
              * 아이디는 이메일 형식으로! *
            </Text>
            <InputID
              type='text'
              placeholder='아이디를 입력하세요'
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <InputID
              type='text'
              placeholder='닉네임을 입력하세요'
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <InputPW
              type='password'
              placeholder='비밀번호를 입력하세요'
              onChange={(e) => {
                setPw(e.target.value);
              }}
            />
            <InputPW
              type='password'
              placeholder='다시 한번 입력하세요'
              onChange={(e) => {
                setPwCheck(e.target.value);
              }}
            />
            <ToLogIn
              onClick={() => {
                props.history.push('/login');
              }}
            >
              돌아가기 &gt;&gt;
            </ToLogIn>
          </Inputs>
          <BtnBox>
            <Button onClick={signup}>
              <img src={ticket} alt={'회원가입 버튼'} />
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
  padding: 10px 20px 20px 40px;
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

const ToLogIn = styled.span`
  margin: 20px 0 0 3px;
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
  &:hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    border: 3px double #aaa;
    opacity: 0.8;
  }
  padding: 0px;
  & > img {
    margin-top: 5px;
    height: 50px;
  }
`;

export default SignUp;
