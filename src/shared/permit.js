import React from 'react';
import { useSelector } from 'react-redux';
import {apiKey} from './firebase';
import { history } from '../redux/configStore';
import { BackGround, Window, Header, Container } from '../elements';
import styled from 'styled-components';

const Permit = (props) => {
  const user_info = useSelector(state => state.user.user);
  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_login = sessionStorage.getItem(session_key);

  if (is_login && user_info) {
    return <React.Fragment>
      {props.children}
    </React.Fragment>
  }
    return (
      <React.Fragment>
        <BackGround>
          <Window>
            <Header />
            <Container>
              <Box>
              <Title>탑승권을 확인하고 있습니다.</Title>
              <ToLogIn onClick={() => {
                history.push('/login');
              }}>확인하러 가기 &gt;&gt;</ToLogIn>
              </Box>
            </Container>
          </Window>
        </BackGround>
      </React.Fragment>
    )
};

const Box = styled.div`
  text-align: center;
  padding-top: 10vh;
`;

const Title = styled.h2`
  color: #49b4e5;
`;

const ToLogIn = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.05rem;
  color: #7fc5e0;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  ${sessionStorage.getItem(`firebase:authUser:${apiKey}:[DEFAULT]`) ? 'pointer-events: none;' : ''};
`;

export default Permit;