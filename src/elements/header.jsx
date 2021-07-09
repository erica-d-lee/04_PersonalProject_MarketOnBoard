import React, { memo } from 'react';
import styled from 'styled-components';
import { Button, Logo } from '.';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { apiKey } from '../shared/firebase';

const Header = memo((props) => {
  const dispatch = useDispatch();
  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_login = sessionStorage.getItem(session_key);

  if (is_login) {
    return (
      <React.Fragment>
        <Headerbox>
          <div
            style={{
              margin: '8px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Logo />
            <Title>Market on Board</Title>
            <Button
              text='로그아웃'
              _onClick={() => {
                dispatch(userActions.logoutFB({}));
              }}
            />
          </div>
        </Headerbox>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Headerbox>
        <div
          style={{
            margin: '8px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Logo />
          <Title>Market on Board</Title>
          <Btn />
        </div>
      </Headerbox>
    </React.Fragment>
  );
});

const Headerbox = styled.div`
  border-bottom: 5px solid #ddd;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 8vh;
  min-height: 70px;
  width: 100%;
  text-align: center;
  padding-top: 3px;
`;

const Title = styled.span`
  color: #fc8829;
  font-size: x-large;
  font-weight: bold;
  padding-top: 15px;
  margin: 0 45px 0 40px;
`;

const Btn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #41b4e2e1;
  border: 3px double white;
  padding: 0px;
`;

export default Header;
